import { Platform, Song } from '@Folody/types/Song';
import { AudioPlayer, AudioPlayerStatus, createAudioPlayer, createAudioResource, entersState, VoiceConnection, VoiceConnectionDisconnectReason, VoiceConnectionStatus } from '@discordjs/voice';
import { Snowflake } from 'discord.js';
import ytdl from 'ytdl-core';
import { Algorithm } from '@Folody/function/algorithm';

const CHUNK_SIZE = Number(process.env.CHUNK_SIZE);
const algorithm = new Algorithm(CHUNK_SIZE);

export interface QueueItem {
  song: Song;
  requester: string;
}

export class Core {

  public guildId: string;
  public playing?: QueueItem;
  public queue: QueueItem[];
  public channelId: Snowflake;
  public voiceID: string;
  
  /**
   * 
   * @param voiceID 
   */
  public setVoice (voiceID: string): void {
    this.voiceID = voiceID;
  }
  public readonly voiceConnection: VoiceConnection;
  public readonly audioPlayer: AudioPlayer;

  private isReady = false;
  
  /**
   * 
   * @param voiceConnection 
   * @param guildId 
   * @param channelId 
   * @param voiceID 
   */
  constructor(voiceConnection: VoiceConnection, guildId: string, channelId: Snowflake, voiceID: Snowflake) {
    this.voiceConnection = voiceConnection;
    this.guildId = guildId;
    this.channelId = channelId;
    this.voiceID = voiceID;
    this.audioPlayer = createAudioPlayer();
    this.queue = [];
    
    this.playing = undefined;
    

    this.voiceConnection.on<"stateChange">('stateChange', async (_, newState) => {
      if (newState.status === VoiceConnectionStatus.Disconnected) {
        if (
          newState.reason === VoiceConnectionDisconnectReason.WebSocketClose &&
          newState.closeCode === 4014
        ) {
          try {
            await entersState(
              this.voiceConnection,
              VoiceConnectionStatus.Connecting,
              3_000,
            );
          } catch (e) {
            this.leave();
          }
        } else if (this.voiceConnection.rejoinAttempts < 5) {
          this.voiceConnection.rejoin();
        } else {
          this.leave();
        }
      } else if (newState.status === VoiceConnectionStatus.Destroyed) {
        this.leave();
      } else if (
        !this.isReady &&
        (newState.status === VoiceConnectionStatus.Connecting ||
          newState.status === VoiceConnectionStatus.Signalling)
      ) {
        this.isReady = true;
        try {
          await entersState(
            this.voiceConnection,
            VoiceConnectionStatus.Ready,
            8_000,
          );
        } catch {
          if (
            this.voiceConnection.state.status !==
            VoiceConnectionStatus.Destroyed
          )
            this.voiceConnection.destroy();
        } finally {
          this.isReady = false;
        }
      }
    });
    

    this.audioPlayer.on<"stateChange">('stateChange', async (oldState, newState) => {
      if (
        newState.status === AudioPlayerStatus.Idle &&
        oldState.status !== AudioPlayerStatus.Idle
      ) {
        await this.play();
      }
    });

    voiceConnection.subscribe(this.audioPlayer);
  }

  /**
   * 
   * @param queueItems 
   */
  public async addSongs(queueItems: QueueItem[]): Promise<void> {
    this.queue = this.queue.concat(queueItems);
    if (!this.playing) {
      await this.play();
    }
  }

  public stop(): void {
    this.playing = undefined;
    this.queue = [];
    this.audioPlayer.stop();
  }

  public leave(): void {
    if (this.voiceConnection.state.status !== VoiceConnectionStatus.Destroyed) {
      this.voiceConnection.destroy();
    }
    this.stop();
    servers.delete(this.guildId);
  }

  public pause(): void {
    this.audioPlayer.pause();
  }

  public resume(): void {
    this.audioPlayer.unpause();
  }

  /**
   * 
   * @param position 
   * @returns 
   */
  public async jump(position: number): Promise<QueueItem> {
    const target = this.queue[position - 1];
    this.queue = this.queue
      .splice(0, position - 1)
      .concat(this.queue.splice(position, this.queue.length - 1));
    this.queue.unshift(target);
    await this.play();
    return target;
  }

  /**
   * 
   * @param position 
   * @returns 
   */
  public remove(position: number): QueueItem {
    return this.queue.splice(position - 1, 1)[0];
  }

  public async play(): Promise<void> {
    try {
      if (this.queue.length > 0) {
        this.playing = this.queue.shift() as QueueItem;
        let stream: any;
        const highWaterMark: number = algorithm.waterMark; // algorithm by Fosly
        if (this.playing?.song.platform === Platform.YOUTUBE) {
          stream = ytdl(this.playing.song.url, {
            highWaterMark,
            filter: 'audioonly',
            quality: 'highestaudio',
            dlChunkSize: CHUNK_SIZE,
          });
        } else {
          return
        }
        const audioResource = createAudioResource(stream);
        this.audioPlayer.play(audioResource);
      } else {
        this.playing = undefined;
        this.audioPlayer.stop();
      }
    } catch (e) {
      this.play();
    }
  }
}

export const servers = new Map<Snowflake, Core>();