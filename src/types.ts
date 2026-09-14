export interface RawShipmentRow {
  no: number;
  code: string;
  shippingMark: string;
  warehouseReceiptNo: string;
  goodsType: string;
  cartons: number;
  weight: number;
  volume: number;
  containerNo: string;
  staff: string;
  totalYuan: number;
  customerPaidYuan: number;
  officePaidYuan: number;
  internalShippingYuan: number;
  exchangeRate: number;
  invoiceAmountUSD: number;
  entryNo: string;
  invoiceNo: string;
  sellingPriceUSD: number;
  customsAmountUSD: number;
}

export interface AggregatedShipment {
  code: string;                  // 1. الكود
  totalCartons: number;          // 2. عدد الكارتون (مجموع)
  totalWeight: number;           // 3. الوزن (مجموع)
  totalVolume: number;           // 4. الحجم (مجموع)
  containerNo: string;           // 5. رقم الحاوية (أو الشحنة)
  shipmentType: string;          // 6. نوع الشحنة ("بحري" إذا بدأ بـ RQ، و"شحنة جوية" إذا بدأ بـ RA)
  totalCustomsUSD: number;       // 7. مبلغ الجمرك ($ حصرياً)
  rowCount: number;
  items: RawShipmentRow[];
}
