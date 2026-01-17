import { Injectable, signal } from '@angular/core';

export type Availability = 'in_stock' | 'backorder';

export interface Product {
  id: string;
  name: string;
  category: 'Movilidad' | 'Higiene y Baño' | 'Descanso' | 'Ortopedia Técnica';
  description: string;
  price: number;
  availability: Availability;
  badges?: Array<'Novedad' | 'Top Ventas'>;
  imageUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly _products = signal<Product[]>([
    {
      id: 'p1',
      name: 'Silla Eléctrica Explorer III',
      category: 'Movilidad',
      description: 'Estructura ligera de aluminio con motor de alto rendimiento.',
      price: 1499,
      availability: 'in_stock',
      badges: ['Novedad'],
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAlt7CCOx1UGuEU9xLLiM-5FGseiY_ozGXGEKxBJtxyDFTVDBjp26HeNjA_hayRnC_e61OYOC6kGWlVMwelbxk_o8AtM9m75CwsJib1XFvSff0wSnlbfB5__oPK74vqmx-7N32H01Nc5299NpZEhC9hYQw5U-TfImyU_8Fu98JMe32EVcLqsGP8i6OKONMh27tmHLVNUAlFmZAPUJ8y2aIUUg02LLEUBwJSqm65Q-Con-MULOv1Ltx5ymkbc9uaSl3v1mweehgpu1NK',
    },
    {
      id: 'p2',
      name: 'Andador Premium Fit',
      category: 'Movilidad',
      description: 'Frenos de seguridad progresivos y asiento ergonómico.',
      price: 125.5,
      availability: 'backorder',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBFDTHoVv19Xb1oG0hkc6FZSJekbhBVxC7_Uf1g9xle4tvLrrrVZ2PNoy0gyLwKco2hrshCoezfr23sAbXly5F2E0JZTt1YtQH7fotMfwUoeBU9y3IG5qW7Td9Ltd8_0UyaaHStQ9Q3I2jdDrt50eA2DcfiZ-HjmEwyi5okhBnUK4A_bH-IWdZunzeuegPzvFL13ZQjxcdpDDz1K7HPYETW5pCGaUaJscuxpAeA6ve7ypX1X6NoLOAzxHQeNNu_7AKkfVPDsnhNwE0B',
    },
    {
      id: 'p3',
      name: 'Cama Articulada Med-Flex',
      category: 'Descanso',
      description: '4 planos de articulación eléctrica con control remoto.',
      price: 849,
      availability: 'in_stock',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDsipQBUzFyfpX5HGjwPioga39UsKRLS-q6fnclBhI9AtEuinbJ2GtAhX8a7CumkfWTvknO0U3YvQp5PalapmK-VHfvYcSkomP0hsI9y4ySk6toIFRn1MWYPO-GU_egE_fKdGwygfarnGGGsfHat-67kMHnwiR4MwZ_BduwGpPlhx5p830G1QgCMyvFb6-p3_6P9Xij7_PvVcMAi94ghaLQvY8ef1tfzdO5Kkbw3EFDA4YUQ_E1Y2kTcEc6CmF5xMfrWwiCwBrrJh6I',
    },
    {
      id: 'p4',
      name: 'Silla Manual Sport Lite',
      category: 'Movilidad',
      description: 'Diseño ultraligero para usuarios activos.',
      price: 340,
      availability: 'in_stock',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBDopE6XHpRtG3ZiXA4U4ePYvq3VoKbeXHZUrk2J54MJO9sZLRGl1hnIzs8P2FrSnLWqpvTDhhAVRo2idau91a6I3OpDYNnfjTzPdnzzy-ipAAC0YGkHx1ZzR9eya5DaACIafhmnerCsV2KJN9zutARfh9P2zwrVYDPkkZ61CBJnEoI6w74o5uLEpD-mBEmMUZiqyFgESZIlnmpeMKS3h9Qu4fQtYXuag4nkoyVchjzm1nSKYhiITyVjUZwCoSkAgVsW2kFmVe4ykSc',
    },
    {
      id: 'p5',
      name: 'Elevador Confort Soft',
      category: 'Higiene y Baño',
      description: 'Instalación universal sin herramientas.',
      price: 65,
      availability: 'in_stock',
    },
    {
      id: 'p6',
      name: 'Pie Protésico Active',
      category: 'Ortopedia Técnica',
      description: 'Respuesta dinámica en fibra de carbono.',
      price: 2100,
      availability: 'backorder',
      badges: ['Top Ventas'],
    },

  ]);

  readonly products = this._products.asReadonly();

  setProducts(products: Product[]) {
    this._products.set(products);
  }
}
