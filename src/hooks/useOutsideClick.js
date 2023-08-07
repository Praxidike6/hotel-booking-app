import { useEffect, useRef } from "react";

export function useOutsideClick(handleFn, listenCaptureStage = true) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        //
        if (ref.current && !ref.current.contains(e.target)) {
          console.log("Click outside of modal");
          handleFn();
        }
      }
      // if listenCaptureStage is true it stops the event from bubbling up
      // to a higher order component and allows the open modal button to work even though it is outside the window
      document.addEventListener("click", handleClick, listenCaptureStage);

      return () => {
        document.removeEventListener("click", handleClick, listenCaptureStage);
      };
    },
    [handleFn, listenCaptureStage]
  );
  return ref;
}
