-- CreateIndex
CREATE INDEX "DataSourceTableParsingTask_dataSourceTableId_idx" ON "DataSourceTableParsingTask"("dataSourceTableId");

-- CreateIndex
CREATE INDEX "DataSourceTableParsingTask_workingState_updateTrigger_idx" ON "DataSourceTableParsingTask"("workingState", "updateTrigger");

-- CreateIndex
CREATE INDEX "PollingTask_pollingState_updateTrigger_idx" ON "PollingTask"("pollingState", "updateTrigger");

-- CreateIndex
CREATE INDEX "Site_address_createdAt_id_idx" ON "Site"("address", "createdAt", "id");

-- CreateIndex
CREATE INDEX "Site_dataSourceTableParsingTaskId_idx" ON "Site"("dataSourceTableParsingTaskId");

-- CreateIndex
CREATE INDEX "users_email_role_idx" ON "users"("email", "role");
