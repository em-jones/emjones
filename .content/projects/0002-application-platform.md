---
title: Cloud Native Application Platform
description:
  Building a cost-effective, flexible, highly-available, and reliable
  Cloud-Native Application Platform
summary: >
  This project focuses on creating a Cloud-Native Application Platform to host
  and manage arbitrary workloads with ease.
tags:
  - ci-cd
  - cloud-native
  - kubernetes
  - terraform
  - aws-cdk
  - gitops
  - argocd
  - argo-rollouts
  - kine
  - rke
---

## The Platform to End All Platforms

### Goals

- Cost-effective - Minimize infrastructure costs while maximizing performance.
- Cloud-agnosticism - Avoid vendor lock-in by supporting multiple cloud
  providers and on-premises deployments.
- Flexible - Support commomn workload types and characteristics:
  - Web Applications
  - APIs / Microservices
  - Background Jobs / Workers
  - Scheduled Tasks / Cron Jobs
  - Event-Driven Functions
  - Scale-to-zero support
- Ops - Streamline application deployment, scaling, and management, via:
  - CI/CD
    - GitOps
    - Infrastructure as Code
  - Observability
    - Logging
    - Monitoring
    - Alerting

### Tools Used

#### Runtime Components

- [`Kubernetes`](https://kubernetes.io/) - Container Orchestration
  - [`Argo CD`](https://argo-cd.readthedocs.io/en/stable/) - GitOps Continuous
    Delivery
  - [`Argo Rollouts`](https://argo-rollouts.readthedocs.io/en/stable/) -
    Advanced Deployment Strategies
  - [`keptn`](https://keptn.sh/) - Cloud-Native Application Lifecycle
    Orchestration
    - [`RKE`](https://rancher.com/docs/rke/latest/en/) - Kubernetes Distribution
    - [`Kine`](https://github.com/k3s-io/kine) - Lightweight SQL datastore for
      Kubernetes state management
  - [`testkube`](https://testkube.io/) - Kubernetes-Native Test Orchestration
  - [`external-secrets`](https://external-secrets.io/) - External Secrets
    Operator
  - [`cert-manager`](https://cert-manager.io/) - Automated Certificate
    Management
  - [`reloader`](https://docs.stakater.com/reloader/) - Auto Reload Pods on
    ConfigMap/Secret Changes
  - [`reflector`](https://github.com/emberstack/kubernetes-reflector)
  - [`karpenter`](https://karpenter.sh/) - Kubernetes Cluster Autoscaler
- [`wasmcloud`](https://wasmcloud.com/) - Cloud-Native WebAssembly Runtime

##### AWS Runtime

- [`AWS CDK`](https://aws.amazon.com/cdk/) - Infrastructure as Code
  - [`IAM`](https://aws.amazon.com/iam/) - Identity and Access Management
  - [`VPC`](https://aws.amazon.com/vpc/) - Virtual Private Cloud

#### Ops

- [`k9s`](https://k9scli.io/) - Kubernetes CLI
- [`helm`](https://helm.sh/) - Kubernetes Package Manager
- [`kustomize`](https://kustomize.io/) - Kubernetes Configuration Customization
- [`devbox`](https://www.jetify.com/devbox)

##### AWS Ops

- [`AWS CodeBuild`](https://aws.amazon.com/codebuild/) - Continuous Integration
  Service
- [`AWS CodePipeline`](https://aws.amazon.com/codepipeline/) - Continuous
  Delivery

##### Github Ops

- [`GitHub Actions`](https://github.com/features/actions)

## Inspiration

- [`Kubefirst`/`Konstruct`](https://konstruct.io/)
