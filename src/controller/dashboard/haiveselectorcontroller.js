/*
__/\\\________/\\\_____/\\\\\\\\\_____/\\\\\\\\\\\__/\\\________/\\\__/\\\\\\\\\\\\\\\_
 _\/\\\_______\/\\\___/\\\\\\\\\\\\\__\/////\\\///__\/\\\_______\/\\\_\/\\\///////////__
  _\/\\\_______\/\\\__/\\\/////////\\\_____\/\\\_____\//\\\______/\\\__\/\\\_____________
   _\/\\\\\\\\\\\\\\\_\/\\\_______\/\\\_____\/\\\______\//\\\____/\\\___\/\\\\\\\\\\\_____
    _\/\\\/////////\\\_\/\\\\\\\\\\\\\\\_____\/\\\_______\//\\\__/\\\____\/\\\///////______
     _\/\\\_______\/\\\_\/\\\/////////\\\_____\/\\\________\//\\\/\\\_____\/\\\_____________
      _\/\\\_______\/\\\_\/\\\_______\/\\\_____\/\\\_________\//\\\\\______\/\\\_____________
       _\/\\\_______\/\\\_\/\\\_______\/\\\__/\\\\\\\\\\\______\//\\\_______\/\\\\\\\\\\\\\\\_
        _\///________\///__\///________\///__\///////////________\///________\///////////////__

	HAIVE web application - GUI Version 0.0.2 (OO)
	For Molcure product
	Base sketch by Lisan
	http://molcure.com
	Author: Lysandre Debut
*/

const gv = require('../../../const/global');
const timeline = require('../../../const/global').timeline;

export class HaiveSelectorController {
    constructor() {
        gv.haiveSelectorController = this;
    }

    addDraggables(small, x, y) {
        if (small) {
            this.addDraggableToStore(x);
        } else if (gv.haiveSelectorModel.getTileHaive(x, y) != null && gv.haiveSelectorModel.getTileHaive(x, y) != "empty") {
            this.addDraggableToTiles(x, y);
        } else {
            this.destroyDraggable(small, x, y);
        }
    }

    destroyDraggable(small, x, y) {
        try {
            if (small) {
                $("#draggable_small_" + x).draggable("destroy");
            } else {
                $("#draggable_" + x + "_" + y).draggable("destroy");
            }
        } catch (e) {
        }
    }

    addDraggableToTiles(x, y) {
        $("#draggable_" + x + "_" + y).draggable({
            helper: function () {
                let clone = $(this).clone();
                clone.height($(this).height());
                clone.width($(this).width());
                return clone;
            },

            stop: function () {

                let closest = gv.getClosestHexagonToMouse();

                if (gv.haiveSelectorModel.getTileHaive(closest[0], closest[1]) != "empty") {
                    let clone = gv.haiveSelectorModel.getTileHaive(closest[0], closest[1]);
                    if (clone != null) {
                        clone = clone.getClone();
                    }
                    gv.haiveSelectorModel.addTileHaive(gv.haiveSelectorModel.getTileHaive(x, y), closest[0], closest[1]);
                    if (clone != null) {
                        gv.haiveSelectorModel.addTileHaive(clone, x, y);
                    } else {
                        gv.haiveSelectorModel.removeTileHaive(x, y);
                    }

                    gv.haiveSelectorView.refresh();
                }

                gv.haiveSelectorModel.updateState();
            }
        });
    }

    addDraggableToStore(x) {
        $("#draggable_small_" + x).draggable({
            helper: function () {
                let clone = $(this).clone();
                clone.height($(this).height());
                clone.width($(this).width());
                return clone;
            },

            stop: function () {

                let closest = gv.getClosestHexagonToMouse()

                if (gv.haiveSelectorModel.getTileHaive(closest[0], closest[1]) != "empty") {
                    if (gv.haiveSelectorModel.getTileHaive(closest[0], closest[1]) != null) {
                        gv.haiveSelectorModel.addStoreHaive(gv.haiveSelectorModel.getTileHaive(closest[0], closest[1]));
                    }
                    gv.haiveSelectorModel.addTileHaive(gv.haiveSelectorModel.getStoreHaives()[x], closest[0], closest[1]);
                    gv.haiveSelectorModel.removeStoreHaive(x);
                    gv.haiveSelectorModel.updateEmptyTiles();
                    gv.haiveSelectorView.refresh();
                }

                gv.haiveSelectorModel.updateState();
            }
        });
    }

    /**
     * Function which displays the miscellaneous hovers such as the hover item to set the description of the haive or the welcome screen
     * @param hover String : "setdescofhaive" and "welcomescreen" are currently the only two supported kinds.
     * @param id id of the hover.
     */
    hoverMisc(hover, id) {
        var parent = gv.haiveSelectorView;
        if (hover == "setdescofhaive") {
            setTimeout(function () {
                parent.setState({hoverMisc: hover + ":" + id});
                window.location = "#desc";
            }, 100);
        } else if (hover == "welcomescreen") {
            setTimeout(function () {
                // console.log("Setting state to welcomescreen");
                parent.setState({hoverMisc: hover + ":" + id});
                window.location = "#welcome";
            }, 100);

        }
    }
}