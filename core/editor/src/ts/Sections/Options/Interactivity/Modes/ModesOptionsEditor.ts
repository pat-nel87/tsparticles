import type { Container } from "tsparticles/dist/Core/Container";
import type { IModes } from "tsparticles/dist/Options/Interfaces/Interactivity/Modes/IModes";
import { ColorUtils, EditorGroup, IHsl, IRgb, EditorType } from "object-gui";
import { EditorBase } from "../../../../EditorBase";
import { ParticlesOptionsEditor } from "../../Particles/ParticlesOptionsEditor";

export class ModesOptionsEditor extends EditorBase {
    public group!: EditorGroup;
    private options!: IModes;

    constructor(particles: Container) {
        super(particles);
    }

    public addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("modes", "Modes");
        this.options = this.group.data as IModes;

        this.addAttract();
        this.addBubble();
        this.addConnect();
        this.addGrab();
        this.addPush();
        this.addRemove();
        this.addRepulse();
        this.addSlow();
        this.addTrail();
    }

    private addAttract(): void {
        const particles = this.particles;
        const group = this.group.addGroup("attract", "Attract");

        group.addProperty("distance", "Distance", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("duration", "Duration", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("speed", "Speed", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }

    private addBubble(): void {
        const particles = this.particles;
        const options = this.options.bubble;
        const group = this.group.addGroup("bubble", "Bubble");
        const color =
            typeof options.color === "string"
                ? options.color
                : options.color instanceof Array
                ? undefined
                : options.color?.value;

        group.addProperty("color", "Color", EditorType.color, color, false).change(async (value: unknown) => {
            if (typeof value === "string") {
                if (typeof options.color === "string") {
                    options.color = value;
                } else {
                    options.color = {
                        value,
                    };
                }
            }

            await particles.refresh();
        });

        group.addProperty("distance", "Distance", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("duration", "Duration", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group
            .addProperty("opacity", "Opacity", EditorType.number)
            .change(async () => {
                await particles.refresh();
            })
            .step(0.01)
            .min(0)
            .max(1);

        group.addProperty("size", "Size", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }

    private addConnect(): void {
        const particles = this.particles;
        const group = this.group.addGroup("connect", "Connect");

        group.addProperty("distance", "Distance", EditorType.number).change(async () => {
            await particles.refresh();
        });

        const connectLinksGroup = group.addGroup("links", "Links");

        connectLinksGroup
            .addProperty("opacity", "Opacity", EditorType.number)
            .change(async () => {
                await particles.refresh();
            })
            .step(0.01)
            .min(0)
            .max(1);

        group.addProperty("radius", "Radius", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }

    private addGrab(): void {
        const particles = this.particles;
        const options = this.options.grab;
        const group = this.group.addGroup("grab", "Grab");
        const grabLinksGroup = group.addGroup("links", "Links");
        const links = options.links;
        const color = typeof links.color === "string" ? links.color : links.color?.value;

        grabLinksGroup.addProperty("blink", "Blink", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        grabLinksGroup.addProperty("color", "Color", EditorType.color, color, false).change(async (value: unknown) => {
            if (typeof value === "string") {
                if (typeof options.links.color === "string") {
                    options.links.color = value;
                } else {
                    options.links.color = {
                        value,
                    };
                }

                await particles.refresh();
            }
        });

        grabLinksGroup.addProperty("consent", "Consent", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        grabLinksGroup
            .addProperty("opacity", "Opacity", EditorType.number)
            .change(async () => {
                await particles.refresh();
            })
            .step(0.01)
            .min(0)
            .max(1);

        group.addProperty("distance", "Distance", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }

    private addPush(): void {
        const particles = this.particles;
        const group = this.group.addGroup("push", "Push");

        group.addProperty("quantity", "Quantity", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }

    private addRemove(): void {
        const particles = this.particles;
        const group = this.group.addGroup("remove", "Remove");

        group.addProperty("remove", "Remove", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }

    private addRepulse(): void {
        const particles = this.particles;
        const group = this.group.addGroup("repulse", "Repulse");

        group.addProperty("distance", "Distance", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("duration", "Duration", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("speed", "Speed", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }

    private addSlow(): void {
        const particles = this.particles;
        const group = this.group.addGroup("slow", "Slow");

        group.addProperty("factor", "Factor", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("radius", "Radius", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }

    private addTrail(): void {
        const particles = this.particles;
        const group = this.group.addGroup("trail", "Trail");
        const options = this.options.trail;

        group.addProperty("delay", "Delay", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("quantity", "Quantity", EditorType.number).change(async () => {
            await particles.refresh();
        });

        const particlesEditor = new ParticlesOptionsEditor(particles);

        particlesEditor.addToGroup(group, "particles", options);
    }
}
