export class ResponseUtils {
  public static success<T>(collectionName: string, data: T) {
    return {
      collectionName,
      data,
    };
  }

  public static ok<T>(data: T, message: string = 'success') {
    return {
      data,
      message,
      success: true,
    };
  }
}
