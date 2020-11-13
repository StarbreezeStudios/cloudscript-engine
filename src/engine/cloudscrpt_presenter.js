"use strict";

const DEFAULT_CODE = 200;
const DEFAULT_STATUS = "OK";
const DEFAULT_REVISION = -1;
const DEFAULT_EXECUTION_TIME_SECONDS = 0.0;
const DEFAULT_PROCESSOR_TIME_SECONDS = 0.0;
const DEFAULT_MEMORY_CONSUMED_BYTES = 0;
const DEFAULT_API_REQUESTS_ISSUED = 1;
const DEFAULT_HTTP_REQUESTS_ISSUED = 0;

module.exports = (function_name, log, handler_result) => {
    return {
        code: DEFAULT_CODE,
        status: DEFAULT_STATUS,
        data: {
            FunctionName: function_name,
            FunctionResult: handler_result,
            Revision: DEFAULT_REVISION,
            ExecutionTimeSeconds: DEFAULT_EXECUTION_TIME_SECONDS,
            ProcessorTimeSeconds: DEFAULT_PROCESSOR_TIME_SECONDS,
            MemoryConsumedBytes: DEFAULT_MEMORY_CONSUMED_BYTES,
            APIRequestsIssued: DEFAULT_API_REQUESTS_ISSUED,
            HttpRequestsIssued: DEFAULT_HTTP_REQUESTS_ISSUED,
            Logs: log.dump()
        }
    };
};
