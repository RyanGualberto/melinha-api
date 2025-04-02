export class CreateProductVariantCategoryDto {
  name: string;
  max: number | undefined;
  type: 'SINGLE' | 'MULTIPLE';
}
