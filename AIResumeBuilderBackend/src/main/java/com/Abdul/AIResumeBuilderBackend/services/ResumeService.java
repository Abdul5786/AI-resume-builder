package com.Abdul.AIResumeBuilderBackend.services;

import java.io.IOException;
import java.util.Map;

public interface ResumeService
{
    Map<String, Object> generateResumeResponse(String prompt) throws IOException;
}
