import { SyntheticEvent } from "react";

export const makeDraggable = (svgElement: SVGCircleElement | null) => {
  let startCoordinates = { x: 0, y: 0 };

  svgElement?.addEventListener("mousedown", (event: Event) => {
    startCoordinates = {
      x: svgElement.cx.animVal.value,
      y: svgElement.cy.animVal.value,
    };
    console.log(`starting drag at ${JSON.stringify(startCoordinates)}`);
  });

  svgElement?.addEventListener("mousemove", (event: MouseEvent) => {
    console.log('dragging')
    svgElement.cx.animVal.value = event.clientX
    svgElement.cy.animVal.value = event.clientY
  });

  const stopDrag = (event: MouseEvent) => {
    console.log(event.clientX);
  };

  svgElement?.addEventListener("mouseup", stopDrag);

  svgElement?.addEventListener("mouseleave", stopDrag);
};
