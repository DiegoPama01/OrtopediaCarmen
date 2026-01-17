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
import { CategoryItem } from '../../../models/category';

@Component({
    selector: 'app-category-modal',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './category-modal.html',
})
export class CategoryModalComponent implements OnChanges {
    @Input() open = false;
    @Input() category: CategoryItem | null = null;
    @Input() saving = false;

    @Output() cancel = new EventEmitter<void>();
    @Output() save = new EventEmitter<CategoryItem>(); // We emit the full object, ID handling in parent

    private fb = inject(FormBuilder);

    form = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        icon: [''],
        description: [''],
    });

    get isEdit() {
        return !!this.category?.id;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['category'] || changes['open']) {
            if (this.open) this.hydrateForm();
        }
    }

    private hydrateForm() {
        const c = this.category;
        this.form.reset({
            name: c?.name ?? '',
            icon: c?.icon ?? '',
            description: c?.description ?? '',
        });
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

        const categoryToSave: CategoryItem = {
            id: this.category?.id ?? '', // Parent/Service handles Create ID logic
            name: value.name!,
            icon: value.icon ?? '',
            description: value.description ?? '',
            productsCount: this.category?.productsCount ?? 0
        };

        this.save.emit(categoryToSave);
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
