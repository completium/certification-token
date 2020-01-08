# Deploy procedure

This document describes how to deploy the Archetype contract on the Tezos Babylon net. It is assumed here that you have installed
- the Archetype transcoder (installation)
- the Ligo compiler (installation)
- the tezos node on the Babylon net (installation)

## Generate Ligo

```$ ./archetype.exe -t ligo contracts/certification_token.arl > certification_token.ligo```

## Generate Michelson

```$ ligo compile-contract certification_token.ligo main > certification_token.tz```

## Originate contract

```$ ./tezos-client originate contract certification_token transferring 0 from user running certification_token.tz --init '(Pair (Pair (Pair {} {}) (Pair 1 1)) (Pair {} {}))' --burn-cap 13.204 --dry-run```

The above command checks on your local tezos node the origination.

Remove `--dry-run` to deploy the contract on the network.

### Intital storage command (optional)
Note that the deploy command above contains the initial storage value:

`(Pair (Pair (Pair {} {}) (Pair 1 1)) (Pair {} {}))`

It can be generated with the following Ligo command:

```$ ligo compile-storage certification_token.ligo main 'record learner_assets = (map end : map(address, learner)); institution_assets = (map end : map(address, institution)); certifier_assets = (map end : map(address, certifier)); certification_assets = (map end : map(string, certification)); dtkl = 1; dtki = 1 end'```


