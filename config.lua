runtime:
  debug: no
  heapSize: 64
  stackSize: 2
  gc: incremental

resources:
  basePath: /assets/
  cache: yes
  preload:
    - textures/
    - sound/
    - lang/en_US.lang

browser:
  canvas: "#game-frame"
  resize: stretch
  preventContextMenu: yes
  pointerLock: yes

network:
  websocket:
    enabled: yes
    reconnect: yes
    timeout: 5000
  cors:
    enabled: no
    credentials: no

filesystem:
  enabled: yes
  persist: yes
  quota: 256

misc:
  logLevel: warn
  unsupportedWarn: yes
  polyfill:
    typedArrays: yes
    bigInt: no

coreapi:
  apifetch: tea-core.xml

offlinemode:
  enabled: yes
  api: fl