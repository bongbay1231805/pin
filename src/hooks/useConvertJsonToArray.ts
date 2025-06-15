function convertJsonStringToArrayOrObject(jsonString: string): any | null {
  try {
    const parsedData = JSON.parse(jsonString);
    return parsedData;
  } catch (error) {
    console.error("Error parsing JSON string:", error);
    return null; // Return null or throw the error, depending on your error handling preference
  }
}
export default convertJsonStringToArrayOrObject;