import { Mesh, Program, Renderer, Triangle, Vec3 } from "ogl";
import { ORB_FRAGMENT_SHADER, ORB_VERTEX_SHADER } from "./orbShaders";

export type OrbConfig = {
  hue: number;
  hoverIntensity: number;
  backgroundColor: string;
};

function parseColorToVec3(color: string): Vec3 {
  if (color.startsWith("#")) {
    const r = parseInt(color.slice(1, 3), 16) / 255;
    const g = parseInt(color.slice(3, 5), 16) / 255;
    const b = parseInt(color.slice(5, 7), 16) / 255;
    return new Vec3(r, g, b);
  }

  const rgb = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgb) {
    return new Vec3(
      parseInt(rgb[1], 10) / 255,
      parseInt(rgb[2], 10) / 255,
      parseInt(rgb[3], 10) / 255,
    );
  }

  return new Vec3(0, 0, 0);
}

class OrbEngine {
  private renderer: Renderer | null = null;
  private gl: Renderer["gl"] | null = null;
  private program: Program | null = null;
  private rafId: number | null = null;
  private mountCount = 0;
  private lastTime = 0;
  private currentRot = 0;
  private readonly rotationSpeed = 0.08;
  private mouseX = 0;
  private mouseY = 0;
  private smoothMouseX = 0;
  private smoothMouseY = 0;
  private targetHover = 0;
  private container: HTMLElement | null = null;
  private resizeObserver: ResizeObserver | null = null;

  private readonly boundMouseMove = (event: MouseEvent) => this.handleMouseMove(event);
  private readonly boundMouseLeave = () => this.handleMouseLeave();

  private init() {
    this.renderer = new Renderer({ alpha: true, premultipliedAlpha: true });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.canvas.style.backgroundColor = "transparent";
    this.gl.canvas.style.width = "100%";
    this.gl.canvas.style.height = "100%";
    this.gl.canvas.style.display = "block";

    const geometry = new Triangle(this.gl);
    this.program = new Program(this.gl, {
      vertex: ORB_VERTEX_SHADER,
      fragment: ORB_FRAGMENT_SHADER,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Vec3(1, 1, 1) },
        hue: { value: 0 },
        hover: { value: 0 },
        rot: { value: 0 },
        hoverIntensity: { value: 0.2 },
        backgroundColor: { value: new Vec3(0, 0, 0) },
        mousePos: { value: [0, 0] as [number, number] },
      },
    });

    new Mesh(this.gl, { geometry, program: this.program });
    this.animate(0);
  }

  mount(container: HTMLElement, config: OrbConfig) {
    if (!this.renderer) {
      this.init();
    }

    this.mountCount += 1;
    this.container = container;

    if (this.gl && !container.contains(this.gl.canvas)) {
      container.appendChild(this.gl.canvas);
    }

    this.updateConfig(config);
    this.resize();

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(container);
    container.addEventListener("mousemove", this.boundMouseMove);
    container.addEventListener("mouseleave", this.boundMouseLeave);
  }

  unmount() {
    this.mountCount -= 1;

    if (this.mountCount > 0) {
      return;
    }

    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }

    this.resizeObserver?.disconnect();
    this.resizeObserver = null;

    if (this.container) {
      this.container.removeEventListener("mousemove", this.boundMouseMove);
      this.container.removeEventListener("mouseleave", this.boundMouseLeave);
    }

    this.container = null;
  }

  updateConfig({ hue, hoverIntensity, backgroundColor }: OrbConfig) {
    if (!this.program) {
      return;
    }

    this.program.uniforms.hue.value = hue;
    this.program.uniforms.hoverIntensity.value = hoverIntensity;
    this.program.uniforms.backgroundColor.value = parseColorToVec3(backgroundColor);
  }

  private resize() {
    if (!this.container || !this.renderer || !this.program) {
      return;
    }

    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    if (width === 0 || height === 0) {
      return;
    }

    this.renderer.setSize(width, height);
    this.program.uniforms.iResolution.value.set(width, height, width / height);
  }

  private handleMouseMove(event: MouseEvent) {
    if (!this.container) {
      return;
    }

    const rect = this.container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const minDim = Math.min(rect.width, rect.height);

    this.mouseX = ((x - rect.width / 2) / minDim) * 2;
    this.mouseY = -((y - rect.height / 2) / minDim) * 2;
    this.targetHover = 1;
  }

  private handleMouseLeave() {
    this.targetHover = 0;
  }

  private animate(time: number) {
    this.rafId = requestAnimationFrame((nextTime) => this.animate(nextTime));

    if (!this.program || !this.gl || !this.renderer) {
      return;
    }

    const delta = (time - this.lastTime) * 0.001;
    this.lastTime = time;

    this.program.uniforms.iTime.value = time * 0.001;
    this.smoothMouseX += (this.mouseX - this.smoothMouseX) * 0.08;
    this.smoothMouseY += (this.mouseY - this.smoothMouseY) * 0.08;
    this.program.uniforms.mousePos.value = [this.smoothMouseX, this.smoothMouseY];

    const hover = this.program.uniforms.hover.value as number;
    this.program.uniforms.hover.value = hover + (this.targetHover - hover) * 0.06;

    this.currentRot += delta * this.rotationSpeed;
    this.program.uniforms.rot.value = this.currentRot;

    if (this.container && this.mountCount > 0) {
      const geometry = new Triangle(this.gl);
      this.renderer.render({
        scene: new Mesh(this.gl, { geometry, program: this.program }),
      });
    }
  }
}

export const orbEngine = new OrbEngine();
