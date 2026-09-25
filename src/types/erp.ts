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
  invoiceNumber: string;
  customer: string;
  fromCity: string;
  toCity: string;
  vehicleNumber: string;
  transporterName: string;
  transporterId: string;
  distanceKm: number;
  validUntil: string;
  status: 'Active' | 'Delivered' | 'Cancelled' | 'Expired';
  generatedAt: string;
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
