import PubSub from "pubsub-js";

export default class ErrorHandler {

  showErrors(arg) {
    for(var i=0; i<arg.errors.length; i++) {
      let err = arg.errors[i]
      PubSub.publish('validation-error', err)
    }
  }
}