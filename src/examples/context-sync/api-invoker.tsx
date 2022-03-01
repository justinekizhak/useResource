import { useState } from "react";
import { useResource } from "../../lib";
import { CommonTypes } from "../../lib/types";
import { useRenderCount } from "../utils/useRenderCount";

export default function ApiInvoker() {
  const [todoIndex, setTodoIndex] = useState(1);
  const { RenderContainer } = useRenderCount();

  const getConfig = (todoIndex = 1): CommonTypes.BaseConfigType => ({
    url: `https://jsonplaceholder.typicode.com/todos/${todoIndex}`
  });

  const { data, refetch } = useResource(getConfig(), "test", {
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
      <button onClick={handleClick}>Refetch</button>
    </div>
  );
}
