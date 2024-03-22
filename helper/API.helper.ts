import { APIRequestContext } from '@playwright/test';

let accessToken: string | null;
let feedbackList: any;

export class ApiHelper {
    constructor(private request: APIRequestContext) {
      this.request = request;
    }

    async getAccessToken(email: string, password: string): Promise<string> {
        try{
            const response = await this.request.post("https://stage.rentzila.com.ua/api/auth/jwt/create/",
            {
                data: {
                    email: email,
                    password: password,
                },
            })

            if(!response.ok) {
                throw new Error(`Failed to get access token for account with email: ${email}`);
            }

            const responseData = await response.json();
            const accessToken = responseData.access;
            if(!accessToken){
                throw new Error(`Access token not found in response for account with email: ${email}`)
            }

            return accessToken;
        } catch (error){
            console.error('Error fetching access token:', error);
            throw error;
        }
    }

    async getFeedbackList() {
        const userAccessToken = await this.createAccessToken();
    await axios
      .get(`https://stage.rentzila.com.ua/api/backcall/`, {
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        },
      })
      .then((response) => {
        feedbackList = response.data;
      });
    return feedbackList;
  }
}