import { CreateSlabDto } from './create-slab.dto';
declare const UpdateSlabDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateSlabDto>>;
export declare class UpdateSlabDto extends UpdateSlabDto_base {
    initial_distance: number;
    final_distance: number;
    price: number;
}
export {};
