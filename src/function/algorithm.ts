/**
 *  algorithm by Fosly (Phat's Dev)
 */

export class Algorithm {
  public x_math!: number;
  public y_math!: number;
  public z_math!: number;
  public waterMark!: number;

  constructor (CHUNK_SIZE: number) {
    if (CHUNK_SIZE) {
      this.x_math = 2;
      this.y_math = 2;
      this.z_math = 2;

      const golden_ratio = (1+Math.sqrt(5))/2;
      const golden_ratio_inverse = 1/golden_ratio;
      const golden_ratio_inverse_square = golden_ratio_inverse**2;

      this.x_math = (CHUNK_SIZE/2)**2*golden_ratio_inverse_square;
      this.y_math = (CHUNK_SIZE/2)**2*golden_ratio_inverse;
      this.z_math = (CHUNK_SIZE/2)**2;

      this.x_math = Math.floor(this.x_math);
      this.waterMark = Math.floor((CHUNK_SIZE/2)**2*2+this.y_math*CHUNK_SIZE/this.z_math*this.x_math);

      
    }
  }
}