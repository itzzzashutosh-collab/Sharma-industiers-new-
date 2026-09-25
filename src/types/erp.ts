export type ScreenType =
  | 'dashboard'
  | 'crm'
  | 'sales'
  | 'quotations'
  | 'invoices'
  | 'inventory'
  | 'production'
  | 'purchase'
  | 'distribution'
  | 'finance'
  | 'marketing'
  | 'branding'
  | 'social'
  | 'reports'
  | 'team'
  | 'settings';

export interface OrderItem {
  name: string;
  qty: number;
  rate: number;
  total: number;
  icon?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  contactPerson?: string;
  initials?: string;
  initialsBg?: string;
  customerType?: 'Dealer' | 'Painter' | 'Contractor' | 'Retailer';
  location?: string;
  destination: string;
  products: string;
  productsExtraCount?: number;
  qty: number;
  amount: string;
  amountRaw: number;
  status: 'Processing' | 'Dispatched' | 'Delivered' | 'Pending' | 'Cancelled' | 'Completed' | 'New';
  date: string;
  orderTime?: string;
  expectedDelivery?: string;
  salesperson?: string;
  paymentStatus: 'Paid' | 'Pending' | 'Partial' | 'Advance' | 'COD' | 'Credit' | 'Refund';
  paymentSub?: string;
  phone?: string;
  paymentTerms?: string;
  items?: OrderItem[];
  subtotal?: number;
  discountPercent?: number;
  discountAmount?: number;
  taxGst?: number;
  finalTotal?: number;
}

export interface InvoiceItem {
  id?: string;
  name: string;
  category?: string;
  hsnCode?: string;
  qty: number;
  unit?: string;
  unitPrice: number;
  discountPercent?: number;
  taxableAmount?: number;
  gstRate?: number;
  total: number;
}

export interface InvoicePaymentRecord {
  id: string;
  paymentDate: string;
  amount: number;
  mode: 'NEFT / RTGS' | 'Cheque' | 'UPI' | 'Cash' | 'Credit Adjustment';
  referenceUtr: string;
  bankName?: string;
  recordedBy: string;
  notes?: string;
}

export interface InvoiceHistoryEvent {
  id: string;
  time: string;
  action: string;
  user: string;
  notes?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  orderNumber: string;
  quoteNumber?: string;
  customer: string;
  customerType?: 'Dealer' | 'Painter' | 'Contractor' | 'Retailer' | 'Direct';
  gstin?: string;
  phone?: string;
  email?: string;
  billingAddress?: string;
  shippingAddress?: string;
  date: string;
  dueDate: string;
  paymentTerms?: string;
  salesperson?: string;
  amount: string;
  amountRaw: number;
  taxableAmount?: number;
  cgstAmount?: number;
  sgstAmount?: number;
  igstAmount?: number;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Partially Paid' | 'Draft' | 'Cancelled';
  amountPaid?: number;
  balanceDue?: number;
  eWayBillNumber?: string;
  irnNumber?: string;
  irnDate?: string;
  irnAcknowledgmentNumber?: string;
  signedQrString?: string;
  items: InvoiceItem[];
  payments?: InvoicePaymentRecord[];
  history?: InvoiceHistoryEvent[];
  notes?: string;
}

export interface RecurringInvoiceRecord {
  id: string;
  profileName: string;
  customer: string;
  customerType: string;
  amount: number;
  frequency: 'Monthly' | 'Bi-Monthly' | 'Quarterly' | 'Annually';
  startDate: string;
  nextRunDate: string;
  lastRunDate?: string;
  status: 'Active' | 'Paused' | 'Completed';
  autoSend: boolean;
  itemSummary: string;
}

export interface CreditNoteRecord {
  id: string;
  creditNoteNumber: string;
  invoiceNumber: string;
  customer: string;
  date: string;
  amount: number;
  reason: 'Damaged Goods' | 'Rate Difference' | 'Sales Return' | 'Discount Adjustment' | 'Order Cancellation';
  status: 'Approved' | 'Draft' | 'Adjusted';
  itemsCount: number;
  adjustedAgainstInvoice: boolean;
  notes?: string;
}

export interface DebitNoteRecord {
  id: string;
  debitNoteNumber: string;
  invoiceNumber: string;
  customer: string;
  date: string;
  amount: number;
  reason: 'Price Revision / Escalation' | 'Additional Freight Charges' | 'Quantity Dispute' | 'Interest on Delayed Payment';
  status: 'Issued' | 'Settled' | 'Draft';
  notes?: string;
}

export interface EWayBillRecord {
  id: string;
  ewbNumber: string;
  invoiceNumber?: string;
  customer?: string;
  fromCity?: string;
  toCity?: string;
  vehicleNumber: string;
  transporterName: string;
  transporterId?: string;
  distanceKm: number;
  validUntil: string;
  status: 'Active' | 'Delivered' | 'Delivered / Closed' | 'Cancelled' | 'Expired';
  generatedAt?: string;
  // Distribution transit permit fields:
  doNumber?: string;
  docDate?: string;
  consignor?: string;
  consignee?: string;
  destinationCity?: string;
  hsnCode?: string;
  goodsDescription?: string;
  taxableValue?: number;
  igstCgstAmount?: number;
  transporterGstin?: string;
}

export interface EInvoiceIRNRecord {
  id: string;
  invoiceNumber: string;
  irnHash: string;
  ackNo: string;
  ackDate: string;
  customer: string;
  gstin: string;
  taxableAmount: number;
  totalAmount: number;
  status: 'Generated' | 'Cancelled';
  portalSync: 'Synced with NIC' | 'Pending';
}

export interface PaymentReceiptRecord {
  id: string;
  receiptNumber: string;
  invoiceNumber: string;
  customer: string;
  paymentDate: string;
  amount: number;
  mode: 'NEFT / RTGS' | 'Cheque' | 'UPI' | 'Cash';
  referenceUtr: string;
  status: 'Cleared' | 'In Clearance' | 'Bounced';
  bankName: string;
}

export interface Lead {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  city: string;
  stage: 'Leads' | 'Contacted' | 'Qualified' | 'Quotation' | 'Won';
  value: number;
  type: 'Painter Contractor' | 'Hardware Dealer' | 'Builder / Infra' | 'Retailer';
  createdAt: string;
}

export interface CatalogProduct {
  id: string;
  name: string;
  sku: string;
  category: string;
  brand: string;
  itemType: 'Finished Products' | 'Raw Materials' | 'Packaging Materials' | 'Other Items';
  unit: string;
  sizes: string[];
  openingStock: number;
  currentStock: number;
  reservedStock: number;
  availableStock: number;
  reorderLevel: number;
  hsnCode: string;
  mrp: number;
  dealerPrice: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  canType?: 'rustic' | 'shine' | 'weather' | 'prime' | 'distemper' | 'roller' | 'waterproof' | 'special';
  bucketColor?: string;
  accentColor?: string;
  locations: Array<{ name: string; stock: number }>;
  recentMovements: Array<{ type: 'IN' | 'OUT'; title: string; qty: string; date: string; reference: string }>;
  batches?: Array<{ batchNo: string; mfgDate: string; expDate: string; qty: number; qcStatus: 'Passed' | 'Under Test' | 'Quarantined' }>;
}

export interface StockMovementRecord {
  id: string;
  movementNumber: string;
  type: 'IN' | 'OUT' | 'TRANSFER';
  category: 'Production Batch' | 'Purchase Receipt (GRN)' | 'Sales Dispatch' | 'Inter-Depot Transfer' | 'Damaged Scrap' | 'Stock Adjustment';
  date: string;
  productName: string;
  sku: string;
  qty: number;
  unit: string;
  source: string;
  destination: string;
  reference: string;
  recordedBy: string;
  status: 'Completed' | 'In Transit' | 'Pending';
}

export interface InventoryBatchRecord {
  id: string;
  batchNumber: string;
  productName: string;
  sku: string;
  mfgDate: string;
  expiryDate: string;
  daysToExpiry: number;
  totalProduced: number;
  availableStock: number;
  unit: string;
  location: string;
  qcStatus: 'Passed' | 'Under Inspection' | 'Quarantined';
  shelfLifeStatus: 'Good' | 'Expiring Soon' | 'Expired';
}

export interface StockAdjustmentRecord {
  id: string;
  adjustmentNumber: string;
  productName: string;
  sku: string;
  location: string;
  date: string;
  bookStock: number;
  physicalStock: number;
  varianceQty: number;
  varianceValue: number;
  reason: 'Transit Damage / Leaks' | 'Evaporation / Shrinkage' | 'Physical Count Correction' | 'Expired Paint Disposal' | 'Sample Testing';
  status: 'Approved' | 'Pending Review';
  auditor: string;
}

export interface WarehouseLocationRecord {
  id: string;
  name: string;
  city: string;
  type: 'Factory Plant' | 'Central Warehouse' | 'Regional Depot';
  totalCapacity: number;
  currentOccupancy: number;
  manager: string;
  phone: string;
  address: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: 'Emulsion' | 'Texture / Distemper' | 'Primer' | 'Exterior Weatherproof';
  sku: string;
  bagsAvailable: number;
  minThreshold: number;
  unitPrice: number;
  unitWeight: string;
  colorScheme: string;
  monthlyBagsSold: number;
  monthlyRevenue: string;
  growth: string;
  iconClass: string;
  bgClass: string;
}

export interface ProductionBatch {
  id: string;
  batchNumber: string;
  productName: string;
  targetBags: number;
  producedBags: number;
  status: 'Completed' | 'In Progress' | 'Quality Check' | 'Scheduled';
  line: string;
  operator: string;
  startTime: string;
  defectCount: number;
  qualityPassRate: number;
  stage?: 'Premixing & Charging' | 'High-Shear Grinding' | 'Thinning & Tinting' | 'QC Testing' | 'Automated Packaging' | 'Palletized';
  progressPercent?: number;
  priority?: 'High' | 'Normal' | 'Urgent';
  targetDate?: string;
  tankId?: string;
  recipeCode?: string;
  density?: string;
  viscosity?: string;
  notes?: string;
}

export interface ProductionBOMIngredient {
  id: string;
  rawMaterialName: string;
  category: 'Pigment' | 'Polymer Binder' | 'Extender / Filler' | 'Additive' | 'Solvent / Water';
  percentage: number;
  quantityPer1000Kg: number;
  unit: string;
  phase: 'Phase 1 - Mill Base Dispersion' | 'Phase 2 - High-Speed Grinding' | 'Phase 3 - Let-Down / Thinning' | 'Phase 4 - Tinting & Adjustments';
  feedOrder: number;
  tolerancePercent: number;
}

export interface ProductionBOMRecipe {
  id: string;
  recipeCode: string;
  productName: string;
  category: 'Interior Emulsion' | 'Exterior Weatherproof' | 'Wall Primer' | 'Texture / Distemper' | 'Enamel & Gloss';
  standardBatchSizeKg: number;
  theoreticalYieldKg: number;
  grindFinenessTarget: string; // e.g. "< 35 microns (Hegman 6.5)"
  viscosityTarget: string; // e.g. "105 - 110 KU"
  phTarget: string; // e.g. "8.5 - 9.0"
  densityTarget: string; // e.g. "1.38 ± 0.03 g/ml"
  cycleTimeHours: number;
  approvedBy: string;
  revision: string;
  ingredients: ProductionBOMIngredient[];
  mixingInstructions: string[];
}

export interface QualityTestRecord {
  id: string;
  sampleCode: string;
  batchNumber: string;
  productName: string;
  sampleTime: string;
  testedBy: string;
  labLocation: string;
  viscosityKU: number;
  viscosityTarget: string;
  specificGravity: number;
  sgTarget: string;
  gloss60Deg: number;
  glossTarget: string;
  finenessMicrons: number;
  finenessTarget: string;
  wetOpacityPercent: number;
  opacityTarget: string;
  phValue: number;
  phTarget: string;
  deltaEColor: number;
  deltaETarget: string;
  dryingTimeMin: number;
  dryingTarget: string;
  result: 'Passed' | 'Failed' | 'Quarantined' | 'Re-tinting Required';
  coaNumber: string;
  remarks: string;
  isCoaGenerated?: boolean;
}

export interface MachineryLine {
  id: string;
  machineCode: string;
  name: string;
  unitType: 'Dispersion Tank' | 'Bead Mill' | 'Thinning Vat' | 'Automated Filling Line' | 'Color Tint Dispenser';
  location: string;
  status: 'Running' | 'Idle' | 'Maintenance' | 'Breakdown';
  currentBatch?: string;
  operator: string;
  oeePercent: number;
  availabilityPercent: number;
  performancePercent: number;
  qualityPercent: number;
  motorRpm?: number;
  temperatureC?: number;
  powerConsumptionKw?: number;
  totalRunHours: number;
  lastServicedDate: string;
  nextServiceDueDate: string;
}

export interface MaterialRequisitionSlip {
  id: string;
  requisitionNo: string;
  batchNumber: string;
  requestedBy: string;
  shift: 'Morning Shift' | 'Evening Shift' | 'Night Shift';
  date: string;
  status: 'Fulfilled' | 'Partially Issued' | 'Pending Store Release';
  department: string;
  items: Array<{
    id: string;
    rawMaterialName: string;
    category: string;
    requiredQtyKg: number;
    issuedQtyKg: number;
    unit: string;
    warehouseBin: string;
    lotNumber: string;
    variancePercent: number;
  }>;
}

export interface PackagingFillingRun {
  id: string;
  runNumber: string;
  batchNumber: string;
  productName: string;
  packSize: '20kg Bag' | '20L Bucket' | '10L Bucket' | '4L Can' | '1L Pack';
  packagingLine: string;
  operator: string;
  shift: string;
  targetCount: number;
  packedCount: number;
  rejectedCount: number;
  fillSpeedBagsPerMin: number;
  weightCheckAvgKg: number;
  leakTestPassRatePercent: number;
  inkjetBatchCodePrinted: boolean;
  status: 'Active Running' | 'Completed' | 'Batch Changeover' | 'Paused';
}

export interface YieldWastageRecord {
  id: string;
  batchNumber: string;
  productName: string;
  date: string;
  theoreticalYieldKg: number;
  actualYieldKg: number;
  yieldPercent: number;
  totalLossKg: number;
  lossesBreakdown: {
    kettleResidueKg: number;
    filterBagSludgeKg: number;
    fillingSpillKg: number;
    labSampleDeductionKg: number;
  };
  washWaterVolumeLiters: number;
  recycledToSlurryLiters: number;
  etpTransferLiters: number;
  status: 'Within Tolerances' | 'High Loss Audit' | 'Optimal Efficiency';
}

export interface MaintenanceDowntimeLog {
  id: string;
  logNumber: string;
  machineCode: string;
  machineName: string;
  category: 'Unplanned Breakdown' | 'Preventive Servicing' | 'Screen / Filter Clog' | 'Color Wash & Flush' | 'Sensor Calibration';
  severity: 'Critical' | 'Medium' | 'Low';
  startTime: string;
  endTime?: string;
  durationMinutes: number;
  reportedBy: string;
  assignedTechnician: string;
  rootCause: string;
  actionTaken: string;
  replacedParts?: string[];
  status: 'Resolved' | 'In Progress' | 'Awaiting Spares';
}

export interface RawMaterial {
  id: string;
  name: string;
  category: 'Pigment' | 'Polymer Binder' | 'Solvent / Additive' | 'Packaging';
  stockKg: number;
  minKg: number;
  unit: string;
  supplier: string;
  status: 'Healthy' | 'Adequate' | 'Low Stock' | 'Critical';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  avatar: string;
  status: 'Active' | 'On Leave';
  recentAction: string;
}

export interface ActivityItem {
  id: string;
  author: string;
  department: string;
  action: string;
  timeAgo: string;
  avatar: string;
}

export interface SystemAlert {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  type: 'danger' | 'warning' | 'info' | 'cycle' | 'finance';
  icon: string;
  badgeBg: string;
  textColor: string;
  resolved?: boolean;
}

export interface OrderApproval {
  id: string;
  orderNumber: string;
  customer: string;
  location: string;
  customerType: string;
  amount: number;
  qty: number;
  requestDate: string;
  flagReason: string;
  requestedDiscount: number;
  standardDiscount: number;
  dealerCreditLimit: number;
  currentOutstanding: number;
  salesperson: string;
  salespersonNote: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'Approved' | 'Rejected' | 'Conditional';
  conditionNote?: string;
}

export interface DispatchConsignment {
  id: string;
  consignmentNumber: string;
  orderNumber: string;
  customer: string;
  destination: string;
  bagsCount: number;
  metricTons: number;
  plantBay: string;
  truckNumber: string;
  driverName: string;
  driverPhone: string;
  transporter: string;
  eWayBill: string;
  status: 'Loading Bay' | 'Gate Pass Issued' | 'In Transit' | 'Out for Delivery' | 'Delivered';
  departureTime?: string;
  eta: string;
  distanceKm: number;
}

export interface ReturnOrderClaim {
  id: string;
  rmaNumber: string;
  orderNumber: string;
  invoiceNumber: string;
  customer: string;
  location: string;
  requestDate: string;
  productName: string;
  bagsQuantity: number;
  claimAmount: number;
  reason: 'Transit Damage' | 'Moisture Hardened' | 'Batch Shade Mismatch' | 'Wrong Product Shipped' | 'Contractor Surplus';
  inspectionStatus: 'Pending Inspection' | 'Inspected & Verified' | 'Credit Note Issued' | 'Replacement Dispatched' | 'Claim Rejected';
  resolutionAction: 'Credit Note' | 'Replacement' | 'Under Review';
  creditNoteNumber?: string;
  inspectorNotes?: string;
}

export interface SalesTargetRep {
  id: string;
  name: string;
  designation: string;
  territory: string;
  targetAmount: number;
  achievedAmount: number;
  targetBags: number;
  soldBags: number;
  conversionRate: number;
  dealersCovered: number;
  incentiveEarned: number;
  avatar: string;
}

export interface SalesFieldVisit {
  id: string;
  salesperson: string;
  dealerName: string;
  location: string;
  time: string;
  purpose: 'Order Booking' | 'Payment Collection' | 'Product Sampling' | 'Complaint Resolution' | 'New Dealer Onboarding';
  outcome: string;
  amountCollected?: number;
  bagsBooked?: number;
}

export interface CrmLead {
  id: string;
  leadId: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  initials: string;
  initialsBg: string;
  type: 'Dealer' | 'Painter' | 'Contractor' | 'Retailer' | 'Architect' | 'Builder' | 'Others';
  source: 'Field Visit' | 'Referral' | 'WhatsApp' | 'Expo' | 'Google' | 'Direct Call' | 'Website';
  status: 'New' | 'Contacted' | 'Qualified' | 'Quotation Sent' | 'Converted' | 'Lost';
  priority: 'High' | 'Medium' | 'Low';
  assignedTo: string;
  createdAt: string;
  nextFollowUp: string;
  nextActionNote: string;
  nextActionTime?: string;
  isHotLead?: boolean;
  interestedProducts: string[];
  estimatedMonthlyBags?: string;
  estimatedValue?: number;
  notes: string;
  orderReference?: string;
  timeAgo: string;
  quotesCount?: number;
  ordersCount?: number;
}

export interface DealerCustomer {
  id: string;
  dealerCode: string;
  storeName: string;
  proprietor: string;
  phone: string;
  email: string;
  city: string;
  district: string;
  tier: 'Platinum Dealer' | 'Gold Dealer' | 'Silver Dealer' | 'Authorized Retailer';
  creditLimit: number;
  outstandingBalance: number;
  monthlyBagsTarget: number;
  monthlyBagsSold: number;
  gstin: string;
  rating: number;
  status: 'Active' | 'Under Review' | 'Credit Suspended';
  salesRep: string;
  lastOrderDate: string;
  totalOrdersCount: number;
  totalRevenue: number;
}

export interface PainterClubMember {
  id: string;
  membershipId: string;
  name: string;
  phone: string;
  city: string;
  tier: 'Master Painter' | 'Senior Applicator' | 'Apprentice';
  pointsBalance: number;
  pointsEarnedLifetime: number;
  scannedCouponsCount: number;
  preferredDealer: string;
  activeSitesCount: number;
  joinedDate: string;
  lastScanDate: string;
  kycStatus: 'Verified' | 'Pending';
}

export interface ContractorProject {
  id: string;
  contractorName: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  city: string;
  currentProject: string;
  projectType: 'Commercial Complex' | 'Residential Township' | 'Government Housing' | 'Educational Campus';
  projectSizeSqFt: string;
  estPuttyDemandBags: number;
  suppliedBags: number;
  assignedDealer: string;
  creditDays: number;
  status: 'In Progress' | 'Finishing Stage' | 'Upcoming';
}

export interface CrmTask {
  id: string;
  title: string;
  leadOrCustomer: string;
  contactPhone: string;
  dueDate: string;
  time: string;
  priority: 'High' | 'Medium' | 'Low';
  assignedTo: string;
  category: 'Follow-up Call' | 'Quotation Review' | 'Sample Delivery' | 'Payment Collection' | 'Site Visit';
  status: 'Pending' | 'Completed' | 'Overdue';
  note: string;
}

export interface CrmMeetingCall {
  id: string;
  type: 'In-Person Meet' | 'Phone Call' | 'WhatsApp Call' | 'Site Inspection';
  clientName: string;
  contactPerson: string;
  locationOrPhone: string;
  dateTime: string;
  duration: string;
  executive: string;
  agenda: string;
  keyOutcome: string;
  nextStep: string;
  nextStepDate: string;
}

export interface LeadSourceMetric {
  source: string;
  icon: string;
  leadsGenerated: number;
  contacted: number;
  qualified: number;
  converted: number;
  conversionRate: number;
  totalRevenue: number;
  cacPerLead: number;
  trend: string;
}

export interface QuotationItem {
  id: string;
  productName: string;
  category?: string;
  qty: number;
  unit: string;
  rate: number;
  amount: number;
}

export interface QuotationRecord {
  id: string;
  quoteNumber: string;
  date: string;
  time?: string;
  customer: string;
  customerType: 'Dealer' | 'Painter' | 'Contractor' | 'Retailer' | 'Direct';
  city: string;
  address: string;
  gstin?: string;
  phone: string;
  email?: string;
  contactPerson?: string;
  items: QuotationItem[];
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  gstPercent: number;
  gstAmount: number;
  totalAmount: number;
  status: 'Draft' | 'Sent' | 'Accepted' | 'Expired' | 'Converted';
  validTill: string;
  createdBy: string;
  salesperson: string;
  termsAndConditions: string[];
  templateId?: string;
  notes?: string;
  timeline?: Array<{
    id: string;
    time: string;
    action: string;
    user: string;
    notes?: string;
  }>;
}

export interface QuotationTemplate {
  id: string;
  name: string;
  tagline: string;
  category: 'Modern Standard' | 'Industrial Bulk' | 'Dealer Wholesale' | 'Luxury Architectural' | 'Government & Tender' | 'Minimalist Receipt';
  themeColor: string;
  accentColor: string;
  fontStyle: string;
  headerLayout: 'classic' | 'modern' | 'industrial' | 'clean' | 'compact' | 'formal';
  badgeText: string;
  watermark: boolean;
  termsTitle: string;
  terms: string[];
  showGstColumn: boolean;
  showHsn: boolean;
  showSignature: boolean;
  popularFor: string;
}

export interface PriceListRecord {
  id: string;
  code: string;
  name: string;
  targetTier: 'Authorized Dealers' | 'Bulk Contractors' | 'Painter Club' | 'Retail Counters' | 'Institutional Projects';
  discountFromMrp: number;
  currency: string;
  effectiveDate: string;
  validUntil: string;
  status: 'Active' | 'Seasonal' | 'Draft';
  itemsCount: number;
  managedBy: string;
}

export interface PurchaseOrderItem {
  id: string;
  materialName: string;
  specification: string;
  qty: number;
  unit: string;
  rate: number;
  amount: number;
}

export interface PurchaseTimelineStep {
  step: string;
  date: string;
  detail: string;
  completed: boolean;
  isPending?: boolean;
}

export interface PurchaseOrderRecord {
  id: string;
  poNumber: string;
  date: string;
  expectedDate: string;
  supplierId: string;
  supplierName: string;
  supplierContact: string;
  supplierPhone: string;
  supplierAddress: string;
  supplierGstin?: string;
  itemsCount: number;
  totalQty: string;
  totalQtyRaw: number;
  totalAmount: string;
  totalAmountRaw: number;
  status: 'Received' | 'In Transit' | 'Partially Received' | 'Pending' | 'Cancelled';
  paymentTerms: string;
  createdBy: string;
  department: string;
  items: PurchaseOrderItem[];
  timeline: PurchaseTimelineStep[];
  grnNumbers?: string[];
  invoiceNumber?: string;
  paidAmount?: number;
  pendingAmount?: number;
  notes?: string;
}

export interface SupplierRecord {
  id: string;
  name: string;
  shortCode: string;
  category: string;
  contactPerson: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  gstin: string;
  rating: number;
  paymentTerms: string;
  outstandingBalance: number;
  activeOrdersCount: number;
  totalPurchases: number;
  status: 'Active' | 'Preferred' | 'Under Review' | 'Inactive';
}

export interface GoodsReceiptRecord {
  id: string;
  grnNumber: string;
  poNumber: string;
  supplierName: string;
  receivedDate: string;
  vehicleNumber: string;
  transporter: string;
  challanNumber: string;
  itemsReceived: Array<{
    materialName: string;
    orderedQty: number;
    receivedQty: number;
    rejectedQty: number;
    unit: string;
    qcStatus: 'Passed' | 'Quarantined';
  }>;
  weighbridgeNetWeightKg: number;
  receiverName: string;
  qcInspector: string;
  status: 'Full Receipt' | 'Partial' | 'QC Inspection';
}

export interface PurchaseReturnRecord {
  id: string;
  returnNumber: string;
  poNumber: string;
  supplierName: string;
  returnDate: string;
  reason: string;
  materialName: string;
  returnQty: number;
  unit: string;
  debitNoteValue: number;
  debitNoteNumber: string;
  status: 'Dispatched' | 'Credit Note Acknowledged' | 'Pending Pickup';
}

export interface PurchaseInvoiceRecord {
  id: string;
  invoiceNumber: string;
  poNumber: string;
  supplierName: string;
  invoiceDate: string;
  dueDate: string;
  taxableAmount: number;
  gstAmount: number;
  totalAmount: number;
  matchingStatus: '3-Way Matched' | 'Price Variance' | 'Qty Discrepancy';
  paymentStatus: 'Paid' | 'Partially Paid' | 'Pending';
  paidAmount: number;
  itcEligible: boolean;
}

export interface SupplierPaymentRecord {
  id: string;
  paymentNumber: string;
  supplierName: string;
  invoiceNumber: string;
  paymentDate: string;
  amount: number;
  mode: 'RTGS' | 'NEFT' | 'Cheque' | 'Advance Adjustment';
  utrRef: string;
  bankAccount: string;
  status: 'Cleared' | 'Initiated' | 'Scheduled';
}

export interface MaterialCostTrendRecord {
  id: string;
  materialName: string;
  category: string;
  currentRatePerKg: number;
  previousMonthRate: number;
  changePercent: number;
  monthlyPurchasedKg: number;
  totalMonthlySpend: number;
  suppliersCount: number;
  priceHistory: Array<{ month: string; rate: number }>;
}

export interface DispatchOrderRecord {
  id: string;
  doNumber: string;
  date: string;
  customer: string;
  customerType: 'Dealer' | 'Painter' | 'Contractor' | 'Direct';
  destination: string;
  products: string;
  bags: number;
  vehicle: string;
  driver: string;
  driverPhone?: string;
  expectedDate: string;
  status: 'In Transit' | 'Delivered' | 'Delayed' | 'Pending' | 'Cancelled';
  route?: string;
  progressPercent?: number;
  podSigned?: boolean;
  ewayBillNumber?: string;
}

export interface FleetVehicleRecord {
  id: string;
  plateNumber: string;
  model: string;
  capacityTons: number;
  assignedDriver: string;
  driverPhone: string;
  currentRoute: string;
  origin: string;
  destination: string;
  status: 'In Transit' | 'Delivered' | 'Delayed' | 'Idle / Available' | 'Under Maintenance';
  progressPercent: number;
  fuelEfficiencyKmpl: number;
  locationCity: string;
  lastLocationUpdate: string;
  fitnessValidTill: string;
  insuranceValidTill: string;
}

export interface DepotRecord {
  id: string;
  name: string;
  city: string;
  address: string;
  currentStockBags: number;
  capacityBags: number;
  skuCount: number;
  depotManager: string;
  phone: string;
  isFactory?: boolean;
  status: 'Operational' | 'High Capacity' | 'Transfer Pending';
}

export interface RoutePlanningRecord {
  id: string;
  routeCode: string;
  routeName: string;
  origin: string;
  destination: string;
  distanceKm: number;
  estimatedHours: number;
  tollPlazasCount: number;
  avgFreightCost: number;
  activeVehiclesCount: number;
  waypoints: string[];
}

export interface PodRecord {
  id: string;
  podNumber: string;
  doNumber: string;
  customerName: string;
  deliveredDate: string;
  deliveredTime: string;
  receivedBy: string;
  receiverPhone: string;
  bagsDelivered: number;
  condition: 'Intact & Sealed' | 'Minor Outer Scuff' | 'Damaged';
  hasDigitalSignature: boolean;
  driverName: string;
  status: 'Verified' | 'Pending Verification';
}

export interface TransporterLedgerRecord {
  id: string;
  transporterName: string;
  contactPerson: string;
  phone: string;
  gstin: string;
  vehicleCount: number;
  panIndiaPermit: boolean;
  standardRatePerKm: number;
  totalTripsCompleted: number;
  totalBilledAmount: number;
  totalPaidAmount: number;
  pendingBalance: number;
  rating: number;
  status: 'Active Transporter' | 'Under Review' | 'Blacklisted';
}

// -------------------------------------------------------------
// FINANCE & ACCOUNTS SUBPAGE INTERFACES
// -------------------------------------------------------------

export interface FinanceTransaction {
  id: string;
  date: string;
  type: 'Income' | 'Expense' | 'Transfer' | 'Adjustment';
  particulars: string;
  category: string;
  reference: string;
  amount: number;
  status: 'Received' | 'Paid' | 'Partial' | 'Pending';
  account?: string;
  paymentMethod?: string;
  notes?: string;
  taxAmount?: number;
  invoiceOrPoId?: string;
}

export interface BankCashAccountRecord {
  id: string;
  name: string;
  accountType: 'Current Account' | 'Operating Account' | 'Cash in Hand' | 'Overdraft / CC Limit';
  accountNumber?: string;
  bankName: string;
  balance: number;
  currency: string;
  lastSynced: string;
  isBank: boolean;
  status: 'Active' | 'Reconciled' | 'Attention Required';
  syncStatus: 'Synced' | 'Pending Sync';
  branchCode?: string;
}

export interface LedgerAccountRecord {
  id: string;
  code: string;
  name: string;
  group: 'Assets' | 'Liabilities' | 'Income' | 'Direct Expenses' | 'Indirect Expenses' | 'Equity';
  openingBalance: number;
  debitTotal: number;
  creditTotal: number;
  closingBalance: number;
  normalBalance: 'Debit' | 'Credit';
  description?: string;
}

export interface AccountsReceivableRecord {
  id: string;
  customerName: string;
  customerTier: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  totalAmount: number;
  receivedAmount: number;
  outstandingAmount: number;
  agingBucket: '0-30 Days' | '31-60 Days' | '61-90 Days' | '90+ Days';
  overdueDays: number;
  status: 'Current' | 'Overdue' | 'Partially Paid';
  salesRep: string;
  phone: string;
}

export interface AccountsPayableRecord {
  id: string;
  vendorName: string;
  vendorCategory: string;
  poNumber: string;
  billNumber: string;
  billDate: string;
  dueDate: string;
  totalAmount: number;
  paidAmount: number;
  outstandingAmount: number;
  status: 'Due Soon' | 'Overdue' | 'Paid' | 'Hold';
  overdueDays: number;
  contactPerson: string;
  phone: string;
}

export interface GstComplianceRecord {
  id: string;
  returnType: 'GSTR-1' | 'GSTR-3B' | 'GSTR-2B' | 'GSTR-9 (Annual)';
  period: string;
  dueDate: string;
  taxableValue: number;
  igst: number;
  cgst: number;
  sgst: number;
  totalTax: number;
  status: 'Filed & Verified' | 'Pending Filing' | 'Draft Ready' | 'Mismatch Detected';
  filingDate?: string;
  arnNumber?: string;
  challanNumber?: string;
}

export interface ExpenseVoucherRecord {
  id: string;
  voucherNumber: string;
  date: string;
  category: string;
  department: string;
  amount: number;
  paidTo: string;
  paidThrough: string;
  approvedBy: string;
  description: string;
  status: 'Approved' | 'Pending Approval' | 'Settled';
  receiptAttached: boolean;
}

export interface BudgetForecastRecord {
  id: string;
  category: string;
  department: string;
  annualBudget: number;
  monthBudget: number;
  monthActual: number;
  varianceAmount: number;
  variancePercent: number;
  status: 'Within Budget' | 'Warning' | 'Exceeded';
  forecastNextMonth: number;
}

export interface AuditTrailRecord {
  id: string;
  timestamp: string;
  user: string;
  userRole: string;
  module: string;
  action: 'Create' | 'Update' | 'Delete' | 'Authorize' | 'Reconcile' | 'Export';
  referenceRecord: string;
  details: string;
  ipAddress: string;
}

export interface MarketingCampaignRecord {
  id: string;
  campaignCode: string;
  title: string;
  category: 'Outdoor / BTL' | 'Digital & Social' | 'Painter Loyalty' | 'Dealer Co-Op' | 'Event / Meet' | 'Festive Launch';
  budgetAllocated: number;
  actualSpend: number;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Scheduled' | 'In Review' | 'Completed' | 'Paused';
  channels: string[];
  targetAudience: string;
  targetRegion: string;
  leadsGenerated: number;
  ordersAttributed: number;
  revenueGenerated: number;
  roiPercentage: number;
  managerName: string;
  notes?: string;
}

export interface PainterLoyaltyMember {
  id: string;
  memberCode: string;
  name: string;
  phone: string;
  city: string;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum Ustaad';
  totalPointsEarned: number;
  pointsBalance: number;
  totalCouponsScanned: number;
  lastScanDate: string;
  upiId: string;
  kycStatus: 'Verified' | 'Pending KYC' | 'Rejected';
  lifetimeCashbackClaimed: number;
  favoriteProduct: string;
}

export interface DealerBrandingRecord {
  id: string;
  requestNumber: string;
  dealerName: string;
  dealerCity: string;
  dealerPhone: string;
  brandingType: 'Shop Fascia Glow-Sign' | 'In-Shop Counter Display' | 'Tinting Machine Unit' | 'Wall Stencil Paint' | 'Canopy / Arch Gate';
  boardDimensions: string;
  totalCost: number;
  dealerShare: number;
  companySubsidy: number;
  status: 'Installed & Verified' | 'Vendor Fabrication' | 'Approval Pending' | 'Under Inspection';
  fabricatorVendor: string;
  installationDate?: string;
  inspectionPhotoUrl?: string;
  verifiedBy?: string;
}

export interface OutdoorMediaRecord {
  id: string;
  siteCode: string;
  locationName: string;
  city: string;
  corridor: string;
  mediaType: 'Unipole Highway Hoarding' | 'Gantry Signboard' | 'Bus Shelter (BQS)' | 'Wall Wrap' | 'Toll Plaza Canopy';
  size: string;
  vendorName: string;
  monthlyRent: number;
  startDate: string;
  expiryDate?: string;
  endDate?: string;
  daysLeft: number;
  status: 'Active Display' | 'Renewal Due' | 'Expired' | 'Under Maintenance';
  estMonthlyImpressions: string;
  litType: 'Front-Lit LED' | 'Back-Lit' | 'Non-Lit';
  campaignMessage: string;
}

export interface MerchandiseItemRecord {
  id: string;
  itemCode: string;
  itemName: string;
  category: 'Color Fandeck' | 'Shade Card' | 'Putty Sample Trial Pouch' | 'Painter Cap & T-Shirt' | 'Dealer Glow Clock' | 'Wall Apron';
  unitCost: number;
  currentStock: number;
  allocatedThisMonth: number;
  minimumBuffer: number;
  unit: string;
  status: 'In Stock' | 'Low Stock' | 'Reorder Placed';
  storageRack: string;
}

export interface MarketingEventRecord {
  id: string;
  eventCode: string;
  title: string;
  eventType: 'Architect Conclave' | 'Contractor Meet' | 'Painter Training Workshop' | 'Dealer Annual Gala';
  venue: string;
  city: string;
  eventDate: string;
  expectedAttendees: number;
  registeredAttendees: number;
  totalBudget: number;
  actualSpend: number;
  organizerLead: string;
  status: 'Upcoming' | 'Completed' | 'In Planning' | 'Cancelled';
  newLeadsCaptured: number;
  chiefGuest?: string;
}

export interface DigitalAdCampaignRecord {
  id: string;
  adName: string;
  platform: 'Google Search Ads' | 'Meta (FB/Insta)' | 'YouTube Vernacular' | 'WhatsApp API' | 'IndiaMART / JustDial';
  budgetDaily: number;
  totalSpend: number;
  impressions: number;
  clicks: number;
  ctr: number;
  cpl: number;
  leadsReceived: number;
  conversionRate: number;
  status: 'Running' | 'Paused' | 'Completed';
  targetAudience: string;
}

export interface BrandSurveyNpsRecord {
  id: string;
  respondentType: 'Painter' | 'Dealer' | 'Contractor' | 'Homeowner';
  respondentName: string;
  city: string;
  npsScore: number;
  ratingCategory: 'Promoter' | 'Passive' | 'Detractor';
  keyFeedback: string;
  productRated: string;
  date: string;
  whitenessRating: number;
  coverageRating: number;
  workabilityRating: number;
}

// -------------------------------------------------------------
// BRANDING & CREATIVE STUDIO INTERFACES
// -------------------------------------------------------------

export interface BrandAssetRecord {
  id: string;
  assetCode: string;
  title: string;
  category: 'Logo & Icon' | 'Packaging Render' | 'Brochure & Catalog' | 'Social Creative' | 'Store Signage' | 'Typography & Guidelines';
  fileType: 'PDF' | 'SVG' | 'PNG' | 'EPS' | 'AI' | 'ZIP';
  fileSize: string;
  version: string;
  updatedDate: string;
  tags: string[];
  thumbnailUrl?: string;
  previewColor?: string;
  downloadsCount: number;
  status: 'Approved' | 'Draft' | 'Archived';
  description?: string;
}

export interface PackagingDesignRecord {
  id: string;
  skuCode: string;
  productName: string;
  category: 'Interior Emulsion' | 'Exterior Weatherguard' | 'Rustic Texture' | 'Waterproofing' | 'Wood & Enamel' | 'Primers & Putty';
  tier: 'Ultra Luxury' | 'Premium' | 'Economy' | 'Industrial';
  packSizes: string[];
  finishType: 'Velvet Sheen' | 'Matte Luxury' | 'High Gloss' | 'Rough Granular' | 'Eggshell';
  eanBarcode: string;
  dieLineStatus: 'Print Ready' | 'Under Review' | 'Revision Pending';
  accentColor: string;
  bucketGradient: string;
  designer: string;
  lastRevision: string;
  printSpecs: {
    substrate: string;
    colors: string;
    finishing: string;
  };
  barcodeCompliant: boolean;
  warrantyYears?: number;
  tagline?: string;
}

export interface ShadeRecord {
  id: string;
  shadeCode: string;
  shadeName: string;
  family: 'Whites & Off-Whites' | 'Warm Tones' | 'Cool Blues' | 'Earthy Greens' | 'Royal Accents' | 'Textures & Metallics';
  hexCode: string;
  rgb: string;
  cmyk: string;
  lrv: number;
  tintBase: 'Base White (W)' | 'Base Yellow (Y)' | 'Base Deep (D)' | 'Base Transparent (TR)';
  formulationPerLiter: string;
  popularityRank: number;
  isTrending: boolean;
  recommendedRoom: string;
}

export interface BrandCreativeRecord {
  id: string;
  creativeCode: string;
  title: string;
  purpose: 'Festival Greeting' | 'Monsoon Waterproofing' | 'Dealer Launch Post' | 'Painter Club Poster' | 'Product Feature Flyer' | 'Truck / Van Livery';
  dimensions: string;
  targetAudience: 'Dealers' | 'Homeowners' | 'Painters' | 'Architects';
  customizable: boolean;
  downloadCount: number;
  accentTheme: string;
  createdDate: string;
  format: '1080x1080 (Square)' | '1920x1080 (Banner)' | 'A4 Print' | '10x4 ft Vinyl';
  previewText?: string;
}

export interface SignageSpecRecord {
  id: string;
  signageType: 'Shopfront Glow Signboard' | '3D Acrylic LED Fascia' | 'In-Store Counter Arch' | 'Tinting Machine Vinyl Wrap' | 'Dealer Flange Board';
  recommendedDimensions: string;
  substrateMaterial: string;
  lightingSpec: string;
  estimatedFabricationCost: number;
  brandCoOpSubsidy: number;
  warrantyPeriod: string;
  sampleApprovedVendors: string[];
  status: 'Standard Spec' | 'Premium Tier Only' | 'New Release';
}

export interface BrandAuditRecord {
  id: string;
  auditCode: string;
  dealerOrLocation: string;
  city: string;
  auditType: 'Storefront Signage' | 'Packaging Label Integrity' | 'Unauthorized Copycat Check' | 'Color Swatch Accuracy';
  inspectionDate: string;
  complianceScore: number;
  status: 'Compliant' | 'Warning Issued' | 'Notice Served' | 'Resolved';
  auditorName: string;
  notes: string;
  actionRequired?: string;
}

