export default class APIClient {
  static HOST = "https://astrocollab.inf.udec.cl/versioner";

  static async get_datasets(): Promise<any> {
    try {
      const response = await fetch(`${APIClient.HOST}/dataset/`, {
        method: "GET",
        headers: new Headers({ "Content-type": "application/json" }),
        cache: "default",
      });
      const text = await response.text();
      const data = text ? JSON.parse(text) : null;
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  static async get_dataset_user(user: string): Promise<any> {
    try {
      const response = await fetch(`${APIClient.HOST}/dataset/${user}`, {
        method: "GET",
        headers: new Headers({ "Content-type": "application/json" }),
        //mode: 'no-cors', // <---
        cache: "default",
      });
      const text = await response.text();
      const data = text ? JSON.parse(text) : null;
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  static async get_version_metadata(
    did: number,
    version: number
  ): Promise<any> {
    try {
      const response = await fetch(
        `${APIClient.HOST}/dataset/${did}/version/${version}`,
        {
          method: "GET",
          headers: new Headers({ "Content-type": "application/json" }),
          //mode: 'no-cors', // <---
          cache: "default",
        }
      );
      const text = await response.text();
      const data = text ? JSON.parse(text) : null;
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  static async get_features(): Promise<any> {
    try {
      const response = await fetch(`${APIClient.HOST}/features`, {
        method: "GET",
        headers: new Headers({ "Content-type": "application/json" }),
        cache: "default",
      });
      const text = await response.text();
      const data = text ? JSON.parse(text) : null;
      return data["features"];
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  static async get_dataset_metadata(did: number): Promise<any> {
    try {
      const response = await fetch(
        `${APIClient.HOST}/dataset/${did}/metadata`,
        {
          method: "GET",
          headers: new Headers({ "Content-type": "application/json" }),
          cache: "default",
        }
      );
      const text = await response.text();
      const data = text ? JSON.parse(text) : null;
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  static async download_dataset(did: number, version: number): Promise<any> {
    try {
      const response = await fetch(
        `${APIClient.HOST}/${did}/version/${version}/download`,
        {
          method: "GET",
          headers: new Headers({ "Content-type": "application/json" }),
          cache: "default",
        }
      );
      /*       const text = await response.text();
      const data = text ? JSON.parse(text) : null;
      return data; */
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  static async post_new_dataset(datasetInformationJson: string): Promise<any> {
    try {
      const response = await fetch(`${APIClient.HOST}/dataset/`, {
        method: "POST",
        headers: new Headers({ "Content-type": "application/json" }),
        cache: "no-cache",
        body: datasetInformationJson,
      });
      const text = await response.text();
      const data = text ? JSON.parse(text) : null;
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
}
