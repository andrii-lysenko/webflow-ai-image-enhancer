export class Notify {
  static success(message: string) {
    webflow.notify({
      type: "Success",
      message,
    });
  }

  static error(message: string) {
    webflow.notify({
      type: "Error",
      message,
    });
  }
}
