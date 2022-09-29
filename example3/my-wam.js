import { WebAudioModule } from "./sdk/index.js";
import MyWamNode from "./wam-audio-player-node.js";

/**
 * @class
 * @extends WebAudioModule
 *
 * Overriding the WebAudioModule to set up the custom WAM processor.
 */
export default class MyWam extends WebAudioModule {
    /**
     * @property {Function} createAudioNode Create the
     * @async
     * @override
     * @param initialState
     * @return {Promise<MyWamNode>}
     */
    async createAudioNode(initialState) {
        await MyWamNode.addModules(this.moduleId);
        const node = new MyWamNode(
            this,
            {
                processorOptions: {
                    numberOfInputs: 1,
                    numberOfOutputs: 1,
                    outputChannelCount: [2],
                    useSab: true
                }
            });

        /**
         * Initialize the node audio node. Register the processor in the audio context and the WAM group.
         */
        node._initialize();
        return node;
    }
}