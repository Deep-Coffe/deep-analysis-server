import { SubscriberDomain, Subscribers } from "@application/kafka/ConsumerDomain";
import UserCreatedController from "../controller/UserCreatedController/UserCreatedController";

class UserSubscriber extends SubscriberDomain {

    public subscriberConfigs: Subscribers[] = [
        {
            controller: UserCreatedController,
            handleAction: 'UserCreated',
        }
    ];

    constructor() {
        super();
    }
}

export default UserSubscriber;