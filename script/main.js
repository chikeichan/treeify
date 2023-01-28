import * as d3 from "d3";

/**
 * Only called when root node is created.
 * Subsequent nodes are creates with tree.insert.
 * @param {[type]} x     [description]
 * @param {[type]} y     [description]
 * @param {[type]} width [description]
 * @param {[type]} color [description]
 */
const Tree = function (x, y, width, color) {
  const tree = {};
  tree.root = { "x": x, "y": y };
  tree.height = findRandom(svgWidth * 0.05, svgWidth * 0.01);
  tree.width = width;
  tree.color = color;
  tree.angle = 0; // In degrees.
  tree.isLeaf = true;
  tree.children = [];
  /**
   * Does not traverse the tree to add nodes to the appropriate spot. Only inserts to child array, one level down.
   * @param  {[type]} color []
   * @return {[Tree]}       [Return value is used in recursive tree creation (init.js) to track context.]
   */
  tree.insert = function () {
    const newAngle = this.angle + findRandom(30, -30);
    const newRoot = this.nextRoot();
    const newTree = Tree(newRoot.x, newRoot.y, this.width / 1.2, this.color);
    newTree.angle = newAngle;
    this.children.push(newTree);
    return newTree;
  };
  /**
   * Uses (parent) tree's root coordinates to calculate coorindates and rotation origin for next level of trees.
   * @return {[object]} [Coordinates for a child's "root". "Root" here refers to the point at the bottom-middle of the rect,
   * the center point for any of the child node's rotations.]
   */
  tree.nextRoot = function () {
    const radian = toRadian(this.angle);
    const newX = this.root.x + this.height * (Math.sin(radian));
    const newY = this.root.y - this.height * (Math.cos(Math.abs(radian)));
    return { "x": newX, "y": newY };
  };
  /**
   * toDegree and toRadian are helper functions used in nextRoot's calculations.
   * @param  {[type]} radian [description]
   * @return {[type]}        [description]
   */
  const toDegree = function (radian) {
    return radian * (180 / Math.PI);
  };
  const toRadian = function (degree) {
    return degree * (Math.PI / 180);
  };

  return tree;
};
/**
 * Global helper functions:
 */
/**
 * 	Used to randomize branch length and new branch angle.
 */
const findRandom = function (max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
};
/**
 * Used to find a color of appropriate contrast, for different properties of the graph.
 */
const getOppoColor = function (c1, c2) {
  if (c1 >= 128) {
    return c1 - c2;
  } else {
    return c1 + c2;
  }
};
/**
 * Outputs a random color.
 * @return {[type]} [description]
 */
const getRandomColor = function () {
  const r = findRandom(255, 0);
  const g = findRandom(255, 0);
  const b = findRandom(255, 0);
  const r2 = getOppoColor(r, findRandom(128, 100));
  const g2 = getOppoColor(g, findRandom(128, 100));
  const b2 = getOppoColor(b, findRandom(128, 100));

  const bgColor = "rgb(" + r2 + "," + g2 + "," + b2 + ")";
  const leafColor = "rgb(" + r + "," + g + "," + b + ")";
  const gradient = "linear-gradient(to bottom right, white -15%, " + bgColor +
    " 80%, black 115%)";

  return { bgColor: bgColor, leafColor: leafColor, gradient: gradient };
};
const addListeners = function () {
  document.querySelector("input#bgcolor").addEventListener("change", function (e) {
    document.querySelector("svg").style.backgroundColor = e.target.value;
  });


  document.querySelector("input#leafcolor").addEventListener("change", function (e) {
    document.querySelectorAll("circle").forEach(circle => {
      circle.style.fill = e.target.value;
    });
  });

  document.querySelector("input#branchcolor").addEventListener("change", function (e) {
    document.querySelectorAll("rect").forEach(rect => {
      rect.style.fill = e.target.value;
    });
  });

  document.querySelector("input#size").addEventListener("blur", function (e) {
    svgWidth = e.target.value;
    svgHeight = e.target.value;
  });
};

const svgWidth = document.documentElement.clientWidth > document.documentElement.clientHeight
  ? document.documentElement.clientHeight * 0.7
  : document.documentElement.clientWidth * 0.8;
const svgHeight = svgWidth;
let allTrees = [];
const leafCoordinates = [];
const rootTree = Tree(svgWidth / 2, svgHeight, svgWidth / 200, "black");

//Draw tree when input detected.
const input = document.querySelector("input#url");
input.addEventListener("keydown", function (e) {
  const query = this.value;
  if (e.keyCode === 13) {
    d3.selectAll("svg").remove();
    const loading = document.createElement("div");
    loading.id = "loading";
    loading.textContent = "Loading...";
    document.querySelector("div#main").appendChild(loading);
    fetch(query)
      .then(response => response.text())
      .then(data => {
        const parsedDOM = new DOMParser().parseFromString(data, "text/html")
          .body.childNodes;
        rootTree.angle = 0;
        allTrees = [rootTree];
        document.querySelector("div#loading").remove();
        for (let i = 0; i < parsedDOM.length; i++) {
          scrape(parsedDOM[i], rootTree);
          rootTree.isLeaf = false;
        }

        assignLeaves();
        drawTree(allTrees, leafCoordinates);
        addListeners();
      });
  }
});

/**
 * Recursively traverses the DOM by calling itself on each child.
 * Also recursively creates Tree elements by holding context of newly created trees and insert()ing children.
 * @param  {[type]} domNode []
 * @param  {[type]} ctx     [most recently created object of class Tree]
 * @return {[type]}         [description]
 */
const scrape = function (domNode, ctx) {
  allTrees.push(ctx.insert());
  const childContext = ctx.children[ctx.children.length - 1];
  if (domNode.childNodes.length > 0) {
    childContext.isLeaf = false;
    for (let i = 0; i < domNode.childNodes.length; i++) {
      scrape(domNode.childNodes[i], childContext);
    }
  }
};
/**
 * Assigns coordinates to end branches by checking the "isLeaf" property.
 * @return {[type]} [description]
 */
const assignLeaves = function () {
  allTrees.forEach(function (tree, index) {
    if (tree.isLeaf) {
      leafCoordinates.push(tree.nextRoot());
    }
  });
};
/**
 * Draws tree in svg based on input arrays.
 * @param  {[type]} allTrees        [description]
 * @param  {[type]} leafCoordinates [description]
 * @return {[type]}                 [description]
 */
const drawTree = function (allTrees, leafCoordinates) {
  //Uses function in data to save a color object.
  const color = getRandomColor();
  document.querySelector("input#size").value = svgWidth;

  //Adding svg canvas.
  const svg = d3.select("div#main").append("svg")
    .attr("class", "tree")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .style("background", color.bgColor);
  //Drawing branches.
  svg.selectAll("rect").data(allTrees)
    .enter().append("rect")
    .attr("x", svgWidth / 2)
    .attr("y", svgHeight)
    .attr("height", 0)
    .transition().duration(5000)
    .attr("x", function (d) {
      return d.root.x - d.width / 2;
    })
    .attr("y", function (d) {
      return d.root.y - d.height;
    })
    .attr("height", function (d) {
      return d.height;
    })
    .attr("width", function (d) {
      return d.width;
    })
    .attr("fill", function (d) {
      return d.color;
    })
    .attr("transform", function (d) {
      return "rotate(" + d.angle + " " + d.root.x + " " + d.root.y + ")";
    });
  //Drawing leaves.
  svg.selectAll("circle").data(leafCoordinates)
    .enter().append("circle")
    .attr("r", 0)
    .transition().duration(5000).delay(5000)
    .attr("cx", function (d) {
      return d.x;
    })
    .attr("cy", function (d) {
      return d.y;
    })
    .attr("r", function (d) {
      return findRandom(svgWidth / 200, svgWidth / 1000);
    })
    .attr("fill", color.leafColor);
};
