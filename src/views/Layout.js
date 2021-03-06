var Entry = require("../models/Entry")
var PropertyForm = require("../components/PropertyForm")
var AddBtn = require("../components/buttons/AddBtn")
var ModelClassName = require("../components/inputs/ModelClassName")
var CustomDbEntityClassName = require("../components/inputs/CustomDbEntityClassName")
var Namespace = require("../components/inputs/Namespace")
var ModelOutput = require("../components/ModelOutput")
var DBEntityOutput = require("../components/DBEntityOutput")
var CopyBtn = require("../components/buttons/CopyBtn")
var ImportBtn = require("../components/buttons/ImportBtn")
var ExportBtn = require("../components/buttons/ExportBtn")
var UndeleteBtn = require("../components/buttons/UndeleteBtn")
var ViewToggleBtn = require("../components/buttons/ViewToggleBtn")
var SortBtn = require("../components/buttons/SortBtn")
var RemoveAllBtn = require("../components/buttons/RemoveAllBtn")

var localStorageKey = "ModelGenerator"

module.exports = {
    oninit: () => {
        var data = JSON.parse(localStorage.getItem(localStorageKey));

        if (data) {
            Entry.import(data)
            m.redraw()
        } else {
            Entry.add()
        }

        window.addEventListener("beforeunload", () => localStorage.setItem(localStorageKey, Entry.export()))
    },
    view: () => {
        return m(".container", [
            m("header", m(".header-controls", [
                m(ImportBtn), m(ExportBtn)
            ]), m("h1", "Model Generator")),
            m(".head-1", m(RemoveAllBtn), m(UndeleteBtn), m(ViewToggleBtn), m(SortBtn), m(AddBtn), m("h3", "Properties"), m(Namespace)),
            m(".head-2", m(CopyBtn, {
                    target: document.getElementById("ModelOutput")
                }), m("h3", "Model output"), m(ModelClassName)
            ),
            m(".head-3", m(CopyBtn, {
                target: document.getElementById("ModelOutputDBEntity")
            }), m("h3", "Custom DB Entity output"), m(CustomDbEntityClassName)),
            m(".body-1"),
            m(".body-2", m(ModelOutput)),
            m(".body-3", m(DBEntityOutput)),
            m(".property-rows", {
					"data-count": Entry.all().length,
					"data-collapsed": ViewToggleBtn.getCollapsedState()
	            },
            	Entry.all().map(entry => {
                    return m(PropertyForm, {
                        key: entry.id, // to delete the proper row!
                        entry: entry
                    })
            }))
        ])
    }
}