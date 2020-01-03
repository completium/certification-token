
function call_bc(props, entrypoint, val) {
  const tezbridge = window.tezbridge;
  return tezbridge.request({
    method: 'inject_operations',
    operations: [
      {
        kind: 'transaction',
        amount: '0',
        destination: props.contractid,
        parameters: {
          entrypoint: entrypoint,
          value: val
        }
      }
    ]
  })
}

function get_bool(v) {
  return { "prim": v ? "True" : "False" };
}

function get_learners(v, addrs) {
  const array = addrs.map(function (addr) { const res = { "string": addr }; return res; });
  const m_elts = addrs.map(function (addr) {
    const res = {
      "prim": "Elt",
      "args": [
        {
          "string": addr
        },
        {
          "prim": "Pair",
          "args": [
            {
              "string": addr
            },
            {
              "int": "0"
            }
          ]
        }
      ]
    };
    return res;
  });
  return {
    "prim": "Pair",
    "args": [
      {
        "prim": "Pair",
        "args": [
          {
            "prim": v ? "True" : "False"
          },
          array
        ]
      },
      m_elts
    ]
  }
}

function get_certifications(key_addrs, cdate, ccer, cins) {
  const array = key_addrs.map(function (addr) { const res = { "string": key_addrs.key }; return res; });
  const m_elts = key_addrs.map(function (key_addr) {
    const res = {
      "prim": "Elt",
      "args": [
        {
          "string": key_addr.key
        },
        {
          "prim": "Pair",
          "args": [
            {
              "prim": "Pair",
              "args": [
                {
                  "prim": "Pair",
                  "args": [
                    {
                      "string": ccer
                    },
                    {
                      "string": cdate
                    }
                  ]
                },
                {
                  "prim": "Pair",
                  "args": [
                    {
                      "string": key_addr.key
                    },
                    {
                      "string": key_addr.addr
                    }
                  ]
                }
              ]
            },
            {
              "string": cins
            }
          ]
        }
      ]
    };
    return res;
  });
  return {
    "prim": "Pair",
    "args": [
      array,
      m_elts
    ]
  }
}

function get_token_dest(nb_tokens, dest) {
  return {
    "prim": "Pair",
    "args": [
      {
        "string": dest
      },
      {
        "int": nb_tokens
      }
    ]
  }
}

export function register_learner(props, v) {
  const val = get_bool(v);
  return call_bc(props, 'register_learner', val);
}

export function register_institution(props, v) {
  const val = get_bool(v);
  return call_bc(props, 'register_institution', val);
}

export function register_certifier(props, v) {
  const val = get_bool(v);
  return call_bc(props, 'register_certifier', val);
}

export function register_learners(props, v, addrs) {
  const val = get_learners(v, addrs);
  return call_bc(props, 'register_learners', val);
}

/*
** key_addrs = [{key="key_value"; addr="tz1...."}; ...]
** cdate = "2020-01-01T00:00:01Z"
** ccer = certification id (string)
** cins = institution key (address)
*/
export function certify(props, key_addrs, cdate, ccer, cins) {
  const val = get_certifications(key_addrs, cdate, ccer, cins);
  return call_bc(props, 'certify', val);
}

export function transfer_learner_token(props, nb_tokens, dest) {
  const val = get_token_dest(nb_tokens, dest);
  return call_bc(props, 'transfer_learner_token', val);
}

export function transfer_institution_token(props, nb_tokens, dest) {
  const val = get_token_dest(nb_tokens, dest);
  return call_bc(props, 'transfer_institution_token', val);
}
