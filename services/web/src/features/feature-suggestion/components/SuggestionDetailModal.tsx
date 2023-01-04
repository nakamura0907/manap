import { isFetchError } from "@lib/fetch";
import { ModalProps } from "antd";
import { projectContext } from "@providers/project";
import { SuggestionDetail } from "@features/feature-suggestion/types";
import Button from "@components/ui/button";
import Checkbox from "@components/ui/checkbox";
import message from "@components/ui/message";
import Modal from "@components/ui/modal";
import React from "react";
import { fetchSuggestionById } from "@features/feature-suggestion";

type Props = Omit<ModalProps, "title" | "open"> & {
  suggestionId?: number;
  onSuggestionRemove: (id: number) => void;
};

type State = {
  suggestion?: SuggestionDetail;
};

const initialValue: State = {
  suggestion: undefined,
};

const useProject = () => React.useContext(projectContext);
export const SuggestionDetailModal = (props: Props) => {
  const { suggestionId, onSuggestionRemove, ...rest } = props;

  const project = useProject();
  const [suggestion, setSuggestion] = React.useState(initialValue.suggestion);

  React.useEffect(() => {
    (async () => {
      const projectId = project?.id;
      if (!suggestionId || !projectId) return;

      const response = await fetchSuggestionById(projectId, suggestionId);
      setSuggestion(response.data);
    })().catch((error) => {
      console.error(error);
      if (isFetchError(error) && error.response) {
        message.error(error.response.data.message);
      } else {
        message.error("機能提案の取得に失敗しました");
      }
    });
  }, [suggestionId, project]);

  React.useEffect(() => {
    if (!suggestionId) {
      setSuggestion(initialValue.suggestion);
    }
  }, [suggestionId, suggestion]);

  const handleRemoveSuggestion = (id: number) => {
    onSuggestionRemove(id);
  };

  if (!suggestion) return null;
  return (
    <Modal title={suggestion.title} open={true} {...rest}>
      <p>{suggestion.description}</p>
      <Checkbox checked={suggestion.status}>実装済み</Checkbox>
      <Checkbox checked={suggestion.clientApproval}>クライアント承認</Checkbox>
      <Checkbox checked={suggestion.vendorApproval}>ベンダー承認</Checkbox>

      <Button danger onClick={() => handleRemoveSuggestion(suggestion.id)}>
        機能提案の削除
      </Button>
    </Modal>
  );
};
