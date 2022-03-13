package com.c0821g1.sprint1.dto;


import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Date;

public class ContractDTO implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
        return false;
    }

    @Override
    public void validate(Object target, Errors errors) {
//        Chưa có validate
    }

    private int contractId;

    private String contractCode;

    @NotNull
    private Integer contractExpired;

    private String contractDateStart;

    private String contractDateEnd;



    @NotNull
    private Integer price;

    @NotNull
    private Integer contractDeposit;
    @NotBlank
    private String contractTaxCode;
    private String contractImageUrl;

    @NotNull
    private Integer contractTotal;

    @NotBlank
    private String contractContent;

    private Integer employeeId;
    private Integer customerId;
    private Integer spaceId;
    private Boolean contractDeleteFlag;
    private int checkFlag;

    public ContractDTO() {
    }

    public int getCheckFlag() {
        return checkFlag;
    }

    public void setCheckFlag(int checkFlag) {
        this.checkFlag = checkFlag;
    }

    public String getContractImageUrl() {
        return contractImageUrl;
    }

    public void setContractImageUrl(String contractImageUrl) {
        this.contractImageUrl = contractImageUrl;
    }


    public String getContractCode() {
        return contractCode;
    }

    public void setContractCode(String contractCode) {
        this.contractCode = contractCode;
    }

    public String getContractTaxCode() {
        return contractTaxCode;
    }

    public void setContractTaxCode(String contractTaxCode) {
        this.contractTaxCode = contractTaxCode;
    }


    public Integer getSpaceId() {
        return spaceId;
    }

    public void setSpaceId(Integer spaceId) {
        this.spaceId = spaceId;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public Integer getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Integer employeeId) {
        this.employeeId = employeeId;
    }

    public int getContractId() {
        return contractId;
    }

    public void setContractId(int contractId) {
        this.contractId = contractId;
    }

    public Integer getContractExpired() {
        return contractExpired;
    }

    public void setContractExpired(Integer contractExpired) {
        this.contractExpired = contractExpired;
    }

    public String getContractDateStart() {
        return contractDateStart;
    }

    public void setContractDateStart(String contractDateStart) {
        this.contractDateStart = contractDateStart;
    }

    public String getContractDateEnd() {
        return contractDateEnd;
    }

    public void setContractDateEnd(String contractDateEnd) {
        this.contractDateEnd = contractDateEnd;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getContractDeposit() {
        return contractDeposit;
    }

    public void setContractDeposit(Integer contractDeposit) {
        this.contractDeposit = contractDeposit;
    }

    public Integer getContractTotal() {
        return contractTotal;
    }

    public void setContractTotal(Integer contractTotal) {
        this.contractTotal = contractTotal;
    }

    public String getContractContent() {
        return contractContent;
    }

    public void setContractContent(String contractContent) {
        this.contractContent = contractContent;
    }

    public Boolean getContractDeleteFlag() {
        return contractDeleteFlag;
    }

    public void setContractDeleteFlag(Boolean contractDeleteFlag) {
        this.contractDeleteFlag = contractDeleteFlag;
    }
}