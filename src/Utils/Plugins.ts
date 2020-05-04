import { IPlugin } from "../Core/Interfaces/IPlugin";
import { IPluginManager } from "../Core/Interfaces/IPluginManager";
import { Container } from "../Core/Container";
import { RecursivePartial } from "../Types/RecursivePartial";
import { IOptions } from "../Options/Interfaces/IOptions";
import { IShapeDrawer } from "../Core/Interfaces/IShapeDrawer";

export class Plugins {
    private static plugins: IPluginManager[] = [];

    public static getPlugin(plugin: string): IPluginManager | undefined {
        return this.plugins.filter(t => t.id === plugin)[0];
    }

    public static addPlugin(plugin: IPluginManager): void {
        if (!this.getPlugin(plugin.id)) {
            this.plugins.push(plugin);
        }
    }

    public static getAvailablePlugins(container: Container): { [id: string]: IPlugin } {
        const res: { [id: string]: IPlugin } = {};
        const availablePlugins = this.plugins.filter(t => t.needsPlugin(container));

        for (const plugin of availablePlugins) {
            res[plugin.id] = plugin.getPlugin(container);
        }

        return res;
    }

    private static presets: { [preset: string]: RecursivePartial<IOptions> } = {};

    public static getPreset(preset: string): RecursivePartial<IOptions> | undefined {
        return this.presets[preset];
    }

    public static addPreset(presetKey: string, options: RecursivePartial<IOptions>): void {
        if (!this.getPreset(presetKey)) {
            this.presets[presetKey] = options;
        }
    }

    private static readonly drawers: { [type: string]: IShapeDrawer } = {};

    public static addShapeDrawer(type: string, drawer: IShapeDrawer): void {
        if (!this.drawers[type]) {
            this.drawers[type] = drawer;
        }
    }

    public static getShapeDrawer(type: string): IShapeDrawer {
        return this.drawers[type];
    }
}