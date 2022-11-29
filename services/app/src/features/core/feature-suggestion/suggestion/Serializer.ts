import Suggestion from "@/features/core/feature-suggestion/suggestion/domain/model/Suggestion";
import Serializer from "@/util/serializer";

class SuggestionSerializer extends Serializer {
  add(suggestion: Suggestion) {
    return this._baseSerialize(suggestion);
  }
  update(suggestion: Suggestion) {
    return this._baseSerialize(suggestion);
  }

  _baseSerialize(suggestion: Suggestion) {
    return {
      id: suggestion.id.value,
      projectId: suggestion.projectId.value,
      proposerId: suggestion.proposerId.value,
      title: suggestion.title.value,
      description: suggestion.description.value,
      status: suggestion.status,
      vendorApproval: suggestion.vendorApproval,
      clientApproval: suggestion.clientApproval,
    };
  }
}

export default SuggestionSerializer;
