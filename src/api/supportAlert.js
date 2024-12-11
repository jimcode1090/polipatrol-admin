import {ENV} from "../utils";

export class SupportAlert {

    baseApi = ENV.BASE_API;

    async getSupportAlerts(accessToken, statusAlert = undefined) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.ALERTS}?statusAlert=${statusAlert}`;
            const params = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };

            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;

        } catch (error) {
            throw error;
        }
    }

    async attendAlert(accessToken, alertId) {
        console.log("Controlador attendAlert",accessToken, alertId);
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.ATTEND_ALERT}/${alertId}`;
            const params = {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };

            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;

        } catch (error) {
            throw error;
        }
    }


}