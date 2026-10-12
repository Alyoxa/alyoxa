
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type TransitionTarget = Element;

function splitTextIntoChars(elements: NodeListOf<Element>) {
  elements.forEach((element) => {
    if (
      element.getAttribute("data-split") === "true" ||
      element.getAttribute("data-masked") === "true"
    ) {
      return;
    }

    const text = element.textContent ?? "";
    element.replaceChildren();

    Array.from(text).forEach((character) => {
      const span = document.createElement("span");

      span.className = "char inline-block transform-gpu";
      span.textContent = character === " " ? "\u00A0" : character;
      span.setAttribute("aria-hidden", "true");

      element.appendChild(span);
    });

    element.setAttribute("data-split", "true");
    element.setAttribute("aria-label", text);
  });
}

function getTargets(block: Element): TransitionTarget[] {
  const targets: TransitionTarget[] = [];

  block.querySelectorAll('[data-transition="line"]').forEach((line) => {
    if (line.getAttribute("data-masked") === "true") {
      targets.push(line);
      return;
    }

    targets.push(...Array.from(line.querySelectorAll(".char")));
  });

  return targets;
}

export function initTransitionAnimation(
  container: HTMLElement
): () => void {
  const ctx = gsap.context(() => {
    const stage = container.querySelector<HTMLElement>(
      '[data-transition="sticky"]'
    );

    const blocks = Array.from(
      container.querySelectorAll<HTMLElement>(
        '[data-transition="block"]'
      )
    );

    if (!stage || blocks.length < 3) return;

    splitTextIntoChars(
      container.querySelectorAll('[data-transition="line"]')
    );

    const targets = blocks.map(getTargets);

    gsap.set(stage, {
      perspective: 1400,
      transformStyle: "preserve-3d",
    });

    gsap.set(blocks, {
      autoAlpha: 0,
      pointerEvents: "none",
      transformStyle: "preserve-3d",
    });

    gsap.set(blocks[0], {
      autoAlpha: 1,
      pointerEvents: "auto",
    });

    targets.forEach((items) => {
      gsap.set(items, {
        transformPerspective: 1000,
        transformOrigin: "50% 50%",
        backfaceVisibility: "hidden",
        willChange: "transform, opacity, filter",
      });
    });

    const hiddenState = {
      autoAlpha: 0,
      rotateX: -55,
      rotateY: 12,
      z: -180,
      y: 75,
      scale: 1.06,
      filter: "blur(12px)",
    };

    const visibleState = {
      autoAlpha: 1,
      rotateX: 0,
      rotateY: 0,
      z: 0,
      x: 0,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
    };

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      scrollTrigger: {
        trigger: container,
        pin: stage,
        start: "top top",
        end: "+=350%",
        scrub: 1.1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        fastScrollEnd: false,
      },
    });

    // SCENE 01 — Make the statement.
    tl.fromTo(
      targets[0],
      hiddenState,
      {
        ...visibleState,
        duration: 1.25,
        stagger: {
          each: 0.018,
          from: "center",
        },
        ease: "power3.out",
      },
      0
    );

    tl.to(
      blocks[0],
      {
        scale: 1.012,
        duration: 0.3,
        ease: "power1.out",
      },
      1.25
    );

    // SCENE 02 — The first statement breaks away as the next arrives.
    tl.addLabel("sceneTwo", 1.75);

    tl.to(
      targets[0],
      {
        autoAlpha: 0,
        rotateX: 50,
        rotateY: -8,
        z: -120,
        y: -65,
        scale: 0.96,
        filter: "blur(10px)",
        duration: 0.75,
        stagger: {
          each: 0.012,
          from: "edges",
        },
        ease: "power2.in",
      },
      "sceneTwo"
    );

    tl.to(
      blocks[0],
      {
        autoAlpha: 0,
        duration: 0.25,
      },
      "sceneTwo+=0.35"
    );

    tl.set(
      blocks[1],
      {
        autoAlpha: 1,
        pointerEvents: "auto",
      },
      "sceneTwo+=0.18"
    );

    tl.fromTo(
      targets[1],
      {
        autoAlpha: 0,
        rotateX: 35,
        rotateY: 20,
        z: -220,
        x: 65,
        y: 55,
        scale: 1.08,
        filter: "blur(14px)",
      },
      {
        ...visibleState,
        duration: 1,
        stagger: {
          each: 0.022,
          from: "center",
        },
        ease: "power3.out",
      },
      "sceneTwo+=0.2"
    );

    tl.to(
      blocks[1],
      {
        scale: 1.012,
        duration: 0.3,
        ease: "power1.out",
      },
      "sceneTwo+=1.15"
    );

    // SCENE 03 — Final statement, revealed with a different direction.
    tl.addLabel("sceneThree", "sceneTwo+=1.65");

    tl.to(
      targets[1],
      {
        autoAlpha: 0,
        rotateX: -45,
        rotateY: 10,
        z: -140,
        x: -45,
        y: -65,
        scale: 0.96,
        filter: "blur(10px)",
        duration: 0.75,
        stagger: {
          each: 0.012,
          from: "edges",
        },
        ease: "power2.in",
      },
      "sceneThree"
    );

    tl.to(
      blocks[1],
      {
        autoAlpha: 0,
        duration: 0.25,
      },
      "sceneThree+=0.35"
    );

    tl.set(
      blocks[2],
      {
        autoAlpha: 1,
        pointerEvents: "auto",
      },
      "sceneThree+=0.18"
    );

    tl.fromTo(
      targets[2],
      {
        autoAlpha: 0,
        rotateX: -30,
        rotateY: -18,
        z: -240,
        x: -55,
        y: 70,
        scale: 1.09,
        filter: "blur(16px)",
      },
      {
        ...visibleState,
        duration: 1.05,
        stagger: {
          each: 0.022,
          from: "center",
        },
        ease: "power3.out",
      },
      "sceneThree+=0.2"
    );

    // Hold the final message, then give it a controlled exit.
    tl.to(
      targets[2],
      {
        autoAlpha: 0,
        rotateX: 35,
        z: -100,
        y: -45,
        scale: 0.98,
        filter: "blur(8px)",
        duration: 0.65,
        stagger: {
          each: 0.01,
          from: "center",
        },
        ease: "power2.in",
      },
      "sceneThree+=1.75"
    );

    tl.to(
      blocks[2],
      {
        autoAlpha: 0,
        duration: 0.2,
      },
      "sceneThree+=2.05"
    );

    ScrollTrigger.refresh();
  }, container);

  return () => {
    ctx.revert();

    // Restore original text markup for clean React remounts.
    container
      .querySelectorAll('[data-transition="line"][data-split="true"]')
      .forEach((line) => {
        line.removeAttribute("data-split");
        line.removeAttribute("aria-label");
        line.textContent = line.textContent ?? "";
      });
  };
}
