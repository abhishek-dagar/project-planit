import { CustomEdgeType } from "@/app/(main)/app/workflow-map/page";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  getStraightPath,
  useReactFlow,
} from "@xyflow/react";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
}: EdgeProps) {
  const { getEdge } = useReactFlow();
  

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <p
          className="absolute bg-muted px-4 py-2 rounded-md w-60"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
          }}
        >
          {(getEdge(id) as CustomEdgeType)?.desc}
        </p>
      </EdgeLabelRenderer>
    </>
  );
}
