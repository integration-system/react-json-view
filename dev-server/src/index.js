"use strict"

//import react and reactDom for browser rendering
import React from "react"
import ReactDom from "react-dom"

import Moment from "moment"

//import the react-json-view component (installed with npm)
import JsonViewer from "./../../src/js/index"

//render 2 different examples of the react-json-view component
ReactDom.render(
    <div>
        {/* just pass in your JSON to the src attribute */}
        <JsonViewer
            sortKeys
            style={{padding: "30px", backgroundColor: "white"}}
            src={getExampleJson1()}
            collapseStringsAfterLength={12}
            onEdit={e => {
                console.log("edit callback", e)
                if (e.new_value == "error") {
                    return false
                }
            }}
            onDelete={e => {
                console.log("delete callback", e)
            }}
            onAdd={e => {
                console.log("add callback", e)
                if (e.new_value == "error") {
                    return false
                }
            }}
            onSelect={e => {
                console.log("select callback", e)
                console.log(e.namespace)
            }}
            displayObjectSize={true}
            name={"dev-server"}
            enableClipboard={copy => {
                console.log("you copied to clipboard!", copy)
            }}
            shouldCollapse={({src, namespace, type}) => {
                if (type === "array" && src.indexOf("test") > -1) {
                    return true
                } else if (namespace.indexOf("moment") > -1) {
                    return true
                }
                return false
            }}
            defaultValue=""
        />
    </div>,
    document.getElementById("app-container")
)

/*-------------------------------------------------------------------------*/
/*     the following functions just contain test json data for display     */
/*-------------------------------------------------------------------------*/

//just a function to get an example JSON object
function getExampleJson1() {
    return {
        parent: {
            sibling1: true,
            sibling2: false,
            sibling3: null,
            isString: value => {
                if (typeof value === "string") {
                    return "string"
                } else {
                    return "other"
                }
            }
        }
    }
}

//and another a function to get an example JSON object
function getExampleJson2() {
    return {
        normalized: {
            "1-grams": {
                body: 1,
                testing: 1
            },
            "2-grams": {
                "testing body": 1
            },
            "3-grams": {}
        },
        noun_phrases: {
            body: 1
        },
        lemmatized: {
            "1-grams": {
                test: 1,
                body: 1
            },
            "2-grams": {
                "test body": 1
            },
            "3-grams": {}
        },
        dependency: {
            "1-grams": {
                testingVERBROOTtestingVERB: 1,
                bodyNOUNdobjtestingVERB: 1
            },
            "2-grams": {
                "testingVERBROOTtestingVERB bodyNOUNdobjtestingVERB": 1
            },
            "3-grams": {}
        }
    }
}

function getExampleJson3() {
    return {
        example_information:
            "this example has the collapsed prop set to true and the indentWidth prop is set to 8",
        default_collapsed: true,
        collapsed_array: [
            "you expanded me",
            "try collapsing and expanding the root node",
            "i will still be expanded",
            {
                leaf_node: true
            }
        ]
    }
}

function getExampleJson4() {
    const large_array = new Array(225).fill(
        "this is a large array full of items"
    )

    large_array.push(getExampleArray())

    large_array.push(new Array(75).fill(Math.random()))

    return large_array
}

function getExampleArray() {
    return [
        "you can also display arrays!",
        new Date(),
        1,
        2,
        3,
        {
            pretty_cool: true
        }
    ]
}
