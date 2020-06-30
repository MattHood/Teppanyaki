CXX = em++
CXX_OPTS = -std=c++17
EM_OPTS = --bind

DEPS = simple_delay_kernel.cpp simple_delay.cpp
OUTPUT = simple_delay_kernel.wasmmodule.js

build: $(DEPS)
	$(CXX) $(CXX_OPTS) $(EM_OPTS) $(DEPS) -o $(OUTPUT)

clean:
	rm simple_delay_kernel.wasmmodule.js simple_delay_kernel.wasmmodule.wasm
