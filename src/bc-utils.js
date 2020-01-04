export function isTz1Address(addr) {
  return addr.length === 36 && addr.startsWith("tz1");
}

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

function get_certifications(certifications) {
  const array = certifications.map(function (certification) { const res = { "string": certification.cid }; return res; });
  const m_elts = certifications.map(function (certification) {
    const res = {
      "prim": "Elt",
      "args": [
        {
          "string": certification.cid
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
                      "string": certification.ccer
                    },
                    {
                      "string": certification.ccertifier
                    }
                  ]
                },
                {
                  "prim": "Pair",
                  "args": [
                    {
                      "string": certification.cdate
                    },
                    {
                      "string": certification.cid
                    }
                  ]
                }
              ]
            },
            {
              "prim": "Pair",
              "args": [
                {
                  "string": certification.cins
                },
                {
                  "string": certification.clea
                }
              ]
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
** key_addrs = [{cid="key_value";
**               cdate = "2020-01-01T00:00:01Z"
**               ccer = certification id (string)
**               clea="tz1...."
**               cins = institution key (address)
**               }; ...]
**
*/
export function certify(props, certification) {
  const val = get_certifications(certification);
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
