interface Window {
  ApplePaySession?: {
    new(version: number, paymentRequest: any): ApplePaySession;
    supportsVersion(version: number): boolean;
    canMakePayments(): boolean;
    STATUS_SUCCESS: number;
    STATUS_FAILURE: number;
  };
}

interface ApplePaySession {
  onvalidatemerchant: (event: { validationURL: string }) => void;
  onpaymentauthorized: (event: { payment: any }) => void;
  oncancel: () => void;
  begin(): void;
  completeMerchantValidation(merchantSession: any): void;
  completePayment(status: number): void;
  abort(): void;
}
