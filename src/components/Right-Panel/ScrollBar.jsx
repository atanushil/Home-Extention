import React from "react";

export default function ScrollBar() {
    document.querySelectorAll('[type="color"]').forEach(($input) => {
        $input.addEventListener("change", (e) => {
          document
            .querySelector(".scroller")
            .style.setProperty(`--${$input.getAttribute("id")}`, $input.value);
        });
      });
  return (
    <div>
      <div class="controls">
        <label for="scrollbar-color-track">Track Color</label>
        <input type="color" id="scrollbar-color-track" value="#0000FF" />
        <label for="scrollbar-color-thumb">Thumb Color</label>
        <input type="color" id="scrollbar-color-thumb" value="#FF69B4" />
      </div>
    </div>
  );
}
