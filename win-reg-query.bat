@echo OFF
setlocal ENABLEEXTENSIONS
set "REG_NAME=%~1"
set "KEY_NAME=%~2"

FOR /F "usebackq skip=2 tokens=1-2*" %%A IN (`REG QUERY "%REG_NAME%" /v %KEY_NAME% 2^>nul`) DO (
	IF NOT [%%C] == [] (
		@echo|set /p="%%C"
	)
)
