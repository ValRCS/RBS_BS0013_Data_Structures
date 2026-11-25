export const presets = {
  "pointers": [
    [
      "Aliases",
      []
    ],
    [
      "Independent pointers",
      [
        {
          "op": "assign",
          "p": "q",
          "target": "b"
        }
      ]
    ],
    [
      "Copy pointer",
      [
        {
          "op": "assign",
          "p": "p",
          "target": "b"
        },
        {
          "op": "copy",
          "p": "q",
          "q": "p"
        }
      ]
    ],
    [
      "Reassign only p",
      [
        {
          "op": "assign",
          "p": "p",
          "target": "b"
        }
      ]
    ],
    [
      "Null pointer",
      [
        {
          "op": "assign",
          "p": "p",
          "target": null
        },
        {
          "op": "read",
          "p": "p"
        }
      ]
    ],
    [
      "Mutation through alias",
      [
        {
          "op": "write",
          "p": "q",
          "value": 5
        }
      ]
    ],
    [
      "Value vs pointer",
      [
        {
          "op": "set",
          "p": "p",
          "target": "a",
          "value": 20
        },
        {
          "op": "assign",
          "p": "p",
          "target": "b"
        },
        {
          "op": "write",
          "p": "p",
          "value": 5
        }
      ]
    ]
  ],
  "lifetime": [
    [
      "Nested scope",
      [
        {
          "op": "enter",
          "p": "p"
        },
        {
          "op": "declare",
          "p": "p"
        },
        {
          "op": "read",
          "p": "p"
        },
        {
          "op": "exit",
          "p": "p"
        },
        {
          "op": "read",
          "p": "p"
        }
      ]
    ],
    [
      "Two observers",
      [
        {
          "op": "enter",
          "p": "p"
        },
        {
          "op": "declare",
          "p": "p"
        },
        {
          "op": "copy",
          "p": "q",
          "q": "p"
        },
        {
          "op": "exit",
          "p": "p"
        },
        {
          "op": "read",
          "p": "q"
        }
      ]
    ],
    [
      "Safe reset",
      [
        {
          "op": "enter",
          "p": "p"
        },
        {
          "op": "declare",
          "p": "p"
        },
        {
          "op": "assign",
          "p": "p",
          "target": null
        },
        {
          "op": "exit",
          "p": "p"
        }
      ]
    ],
    [
      "Outer object survives",
      [
        {
          "op": "declare",
          "p": "p"
        },
        {
          "op": "enter",
          "p": "p"
        },
        {
          "op": "declare",
          "p": "q"
        },
        {
          "op": "exit",
          "p": "p"
        },
        {
          "op": "read",
          "p": "p"
        }
      ]
    ],
    [
      "Null is not dangling",
      [
        {
          "op": "enter",
          "p": "p"
        },
        {
          "op": "declare",
          "p": "p"
        },
        {
          "op": "exit",
          "p": "p"
        },
        {
          "op": "assign",
          "p": "p",
          "target": null
        }
      ]
    ]
  ],
  "dynamic": [
    [
      "Allocate and release",
      [
        {
          "op": "allocate",
          "p": "p"
        },
        {
          "op": "read",
          "p": "p"
        },
        {
          "op": "delete",
          "p": "p"
        },
        {
          "op": "assign",
          "p": "p",
          "target": null
        }
      ]
    ],
    [
      "Dangling alias",
      [
        {
          "op": "allocate",
          "p": "p"
        },
        {
          "op": "copy",
          "p": "q",
          "q": "p"
        },
        {
          "op": "delete",
          "p": "p"
        },
        {
          "op": "assign",
          "p": "p",
          "target": null
        },
        {
          "op": "read",
          "p": "q"
        }
      ]
    ],
    [
      "Lost allocation",
      [
        {
          "op": "allocate",
          "p": "p"
        },
        {
          "op": "assign",
          "p": "p",
          "target": null
        }
      ]
    ],
    [
      "Overwrite owner",
      [
        {
          "op": "allocate",
          "p": "p"
        },
        {
          "op": "allocate",
          "p": "p"
        }
      ]
    ],
    [
      "Double deletion",
      [
        {
          "op": "allocate",
          "p": "p"
        },
        {
          "op": "delete",
          "p": "p"
        },
        {
          "op": "delete",
          "p": "p"
        }
      ]
    ],
    [
      "Transfer responsibility",
      [
        {
          "op": "allocate",
          "p": "p"
        },
        {
          "op": "copy",
          "p": "q",
          "q": "p"
        },
        {
          "op": "owner",
          "p": "q"
        },
        {
          "op": "assign",
          "p": "p",
          "target": null
        },
        {
          "op": "delete",
          "p": "q"
        }
      ]
    ],
    [
      "Two allocations",
      [
        {
          "op": "allocate",
          "p": "p"
        },
        {
          "op": "allocate",
          "p": "q",
          "value": 17
        },
        {
          "op": "delete",
          "p": "q"
        }
      ]
    ],
    [
      "Observer remains",
      [
        {
          "op": "allocate",
          "p": "p"
        },
        {
          "op": "copy",
          "p": "q",
          "q": "p"
        },
        {
          "op": "assign",
          "p": "p",
          "target": null
        },
        {
          "op": "owner",
          "p": "q"
        },
        {
          "op": "delete",
          "p": "q"
        }
      ]
    ]
  ],
  "chain": [
    [
      "Normal chain",
      3,
      []
    ],
    [
      "Empty chain",
      0,
      []
    ],
    [
      "Disconnected B",
      3,
      [
        [
          "link",
          "A",
          "C"
        ]
      ]
    ],
    [
      "Shared suffix",
      4,
      [
        [
          "link",
          "D",
          "B"
        ]
      ]
    ],
    [
      "Cycle",
      3,
      [
        [
          "link",
          "C",
          "A"
        ]
      ]
    ],
    [
      "Dangling link",
      3,
      [
        [
          "end",
          "B",
          null
        ]
      ]
    ],
    [
      "Eight nodes",
      8,
      []
    ]
  ]
};
