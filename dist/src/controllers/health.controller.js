import { healthService } from "../services/health.service.js";
export function getHealth(_request, response) {
    response.status(200).json(healthService.getStatus());
}
//# sourceMappingURL=health.controller.js.map