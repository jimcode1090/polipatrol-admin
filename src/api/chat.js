import { ENV } from "../utils";

export class Chat {

    baseApi = ENV.BASE_API;

    async create(token, participantIdOne, participantIdTwo) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.CHAT}`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    participant_id_one: participantIdOne,
                    participant_id_two: participantIdTwo,
                }),
            };

            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 200 && response.status !== 201) {
                throw result;
            }

            return result;
        } catch (error) {
            throw error;
        }
    }


    async getAll (accessToken) {
        try {

            const url = `${this.baseApi}/${ENV.API_ROUTES.CHAT}`;
            const params = {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
            const response = await fetch(url, params);
            const data = await response.json();
            if (response.status !== 200) throw data;
            return data;

        } catch (error) {
            throw error
        }
    }

}