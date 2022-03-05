import { useState } from "react";
import { useResource } from "../../lib";
import { BaseConfigType } from "../../lib/types";
import { useRenderCount } from "../utils/useRenderCount";

export default function ApiInvoker() {
  const [todoIndex, setTodoIndex] = useState(1);
  const { RenderContainer } = useRenderCount();

  const getConfig = (todoIndex = 1): BaseConfigType => ({
    url: `https://jsonplaceholder.typicode.com/todos/${todoIndex}`
  });

  const { data, refetch, isFetching } = useResource(getConfig(), "test", {
    useGlobalContext: true
  });

  const handleClick = () => {
    const newIndex = todoIndex + 1;
    refetch(getConfig(newIndex));
    setTodoIndex(newIndex);
  };

  return (
    <div>
      <h1>Api Invoker</h1>
      <RenderContainer />
      {JSON.stringify(data)}
      {isFetching + ""}
      <button onClick={handleClick}>Next item</button>
    </div>
  );
}
