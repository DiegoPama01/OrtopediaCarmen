import {
    Component,
    EventEmitter,
    HostListener,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductItem } from '../../../models/product';
import { CategoryItem } from '../../../models/category';

export interface ProductModalSavePayload {
    product: ProductItem; // Partial or Omit logic might be better handled in service, but here we emit result
    imageFile?: File | null;
}

@Component({
    selector: 'app-product-modal',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './product-modal.html',
})
export class ProductModalComponent implements OnChanges {
    @Input() open = false;
    @Input() product: ProductItem | null = null;
    @Input() categories: CategoryItem[] = [];
    @Input() saving = false;

    @Output() cancel = new EventEmitter<void>();
    @Output() save = new EventEmitter<ProductModalSavePayload>();

    imagePreviewUrl: string | null = null;
    imageFile: File | null = null;

    private fb = inject(FormBuilder);

    form = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        categoryId: ['', []],
        price: [0, [Validators.required, Validators.min(0)]],
        description: [''],
    });

    get isEdit() {
        return !!this.product?.id;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['product'] || changes['open']) {
            if (this.open) this.hydrateForm();
        }
    }

    private hydrateForm() {
        const p = this.product;
        this.form.reset({
            name: p?.name ?? '',
            categoryId: p?.category?.id ?? '',
            price: p?.price ?? 0,
            description: p?.description ?? '',
        });

        this.imageFile = null;
        this.imagePreviewUrl = p?.imageUrl ?? null;
        this.form.markAsPristine();
        this.form.markAsUntouched();
    }

    onClose() {
        if (!this.saving) this.cancel.emit();
    }

    onSubmit() {
        if (this.saving) return;
        this.form.markAllAsTouched();
        if (this.form.invalid) return;

        const value = this.form.getRawValue();

        // Reconstruct category object from ID
        const selectedCat = this.categories.find(c => c.id === value.categoryId) ?? null;

        // Use existing ID if editing, or create new object implies ID handled by service/DB?
        // The ProductItem interface requires an ID. For creation, we might send a temporary one 
        // or the parent handles Omit<ProductItem, 'id'>.
        // The previous plan mentioned "ProductModalSavePayload { product: ProductItem }".
        // Let's assume for creation we mock the ID or the parent handles the type conversion.
        // Actually, `ProductItem` has mandatory `id`.
        // Let's cast to `ProductItem` carefully.

        const productToSave: ProductItem = {
            id: this.product?.id ?? '', // Service will ignore this for Create
            name: value.name!,
            category: selectedCat, // nullable now
            price: Number(value.price),
            description: value.description ?? '',
            quantity: this.product?.quantity ?? 0,
            imageUrl: this.product?.imageUrl // Keep existing imageUrl, parent will update if new file
        };

        this.save.emit({ product: productToSave, imageFile: this.imageFile });
    }

    onFilePicked(file: File | null) {
        if (!file) return;
        if (!/^image\/(png|jpeg|jpg|webp)$/i.test(file.type)) return;

        this.imageFile = file;
        const url = URL.createObjectURL(file);
        this.imagePreviewUrl = url;
    }

    onFileInputChange(event: Event) {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0] ?? null;
        this.onFilePicked(file);
        if (input) input.value = '';
    }

    onDrop(e: DragEvent) {
        e.preventDefault();
        const file = e.dataTransfer?.files?.[0] ?? null;
        this.onFilePicked(file);
    }

    onDragOver(e: DragEvent) {
        e.preventDefault();
    }

    removeImage() {
        if (this.saving) return;
        this.imageFile = null;
        this.imagePreviewUrl = null;
    }

    @HostListener('document:keydown.escape')
    onEsc() {
        if (this.open) this.onClose();
    }

    onBackdropClick(e: MouseEvent) {
        if ((e.target as HTMLElement).dataset['backdrop'] === 'true') {
            this.onClose();
        }
    }

    hasError(ctrlName: keyof typeof this.form.controls, error: string) {
        const ctrl = this.form.controls[ctrlName];
        return ctrl.touched && ctrl.hasError(error);
    }
}
