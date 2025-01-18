export class WebhookError extends Error {
  constructor(
    public code: number,
    public message: string,
    public name: string = 'Webhook Error'
  ) {
    super(message);
  }
}
