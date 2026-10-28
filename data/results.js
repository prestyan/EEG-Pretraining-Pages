window.ATLAS_DATA = {
  "schemaVersion": 1,
  "importedAt": "2026-10-28T04:24:49.456730+00:00",
  "protocol": "LOSO",
  "aggregation": "Ratios of reported mean Cohen's kappa scores",
  "spreadLabel": "Reported ± value; dispersion definition not specified in source workbooks",
  "datasets": [
    {
      "id": "BCIC-2A",
      "label": "BCIC-2A",
      "task": "Motor imagery",
      "shortTask": "MI",
      "classes": 4
    },
    {
      "id": "BCIC-2B",
      "label": "BCIC-2B",
      "task": "Motor imagery",
      "shortTask": "MI",
      "classes": 2
    },
    {
      "id": "SEED-IV",
      "label": "SEED-IV",
      "task": "Emotion recognition",
      "shortTask": "Emotion",
      "classes": 4
    },
    {
      "id": "pBCIW",
      "label": "pBCIW",
      "task": "Cognitive workload",
      "shortTask": "Workload",
      "classes": null
    }
  ],
  "modelOrder": [
    "BENDR",
    "BIOT",
    "LaBraM",
    "EEGPT",
    "CBraMod",
    "CodeBrain",
    "SingLEM"
  ],
  "sources": [
    {
      "name": "结果汇总.xlsx",
      "sha256": "904bff5d0e6e07f000d8028e945cecf0a5dc1a41af6aacc2eaccb076ce5c8318"
    },
    {
      "name": "新指标单独汇总.xlsx",
      "sha256": "09aec117891508bba32099ee32f52085dcb7a3025d021e69c9ad518fecc6b355"
    }
  ],
  "missingMeasurements": [],
  "records": [
    {
      "dataset": "BCIC-2A",
      "model": "BENDR",
      "metrics": {
        "prr": 0.362381363244176,
        "acs": 1.0186942766752949,
        "pvs": 0.0
      },
      "performance": {
        "bac": {
          "frozen": {
            "mean": 0.3445,
            "spread": 0.0341
          },
          "finetuned": {
            "mean": 0.5108,
            "spread": 0.0604
          },
          "scratch": {
            "mean": 0.5156,
            "spread": 0.0626
          }
        },
        "kappa": {
          "frozen": {
            "mean": 0.126,
            "spread": 0.0455
          },
          "finetuned": {
            "mean": 0.3477,
            "spread": 0.0805
          },
          "scratch": {
            "mean": 0.3542,
            "spread": 0.0834
          }
        },
        "f1": {
          "frozen": {
            "mean": 0.3361,
            "spread": 0.0336
          },
          "finetuned": {
            "mean": 0.5074,
            "spread": 0.063
          },
          "scratch": {
            "mean": 0.5077,
            "spread": 0.0656
          }
        }
      },
      "source": {
        "metrics": {
          "file": "新指标单独汇总.xlsx",
          "sheet": "Sheet1",
          "range": "B3:D3"
        },
        "performance": {
          "file": "结果汇总.xlsx",
          "sheet": "BCIC2A",
          "range": "B3:J3"
        }
      }
    },
    {
      "dataset": "BCIC-2A",
      "model": "BIOT",
      "metrics": {
        "prr": 0.48902728351126923,
        "acs": 1.1562870699881376,
        "pvs": 0.0
      },
      "performance": {
        "bac": {
          "frozen": {
            "mean": 0.3736,
            "spread": 0.073
          },
          "finetuned": {
            "mean": 0.5029,
            "spread": 0.1281
          },
          "scratch": {
            "mean": 0.5424,
            "spread": 0.1413
          }
        },
        "kappa": {
          "frozen": {
            "mean": 0.1649,
            "spread": 0.0973
          },
          "finetuned": {
            "mean": 0.3372,
            "spread": 0.1708
          },
          "scratch": {
            "mean": 0.3899,
            "spread": 0.1884
          }
        },
        "f1": {
          "frozen": {
            "mean": 0.323,
            "spread": 0.081
          },
          "finetuned": {
            "mean": 0.4827,
            "spread": 0.1353
          },
          "scratch": {
            "mean": 0.5331,
            "spread": 0.1494
          }
        }
      },
      "source": {
        "metrics": {
          "file": "新指标单独汇总.xlsx",
          "sheet": "Sheet1",
          "range": "B4:D4"
        },
        "performance": {
          "file": "结果汇总.xlsx",
          "sheet": "BCIC2A",
          "range": "B4:J4"
        }
      }
    },
    {
      "dataset": "BCIC-2A",
      "model": "LaBraM",
      "metrics": {
        "prr": 0.3980728696175851,
        "acs": 0.322192110809997,
        "pvs": 0.501574043945807
      },
      "performance": {
        "bac": {
          "frozen": {
            "mean": 0.3491,
            "spread": 0.0583
          },
          "finetuned": {
            "mean": 0.4991,
            "spread": 0.0819
          },
          "scratch": {
            "mean": 0.3303,
            "spread": 0.0525
          }
        },
        "kappa": {
          "frozen": {
            "mean": 0.1322,
            "spread": 0.0777
          },
          "finetuned": {
            "mean": 0.3321,
            "spread": 0.1093
          },
          "scratch": {
            "mean": 0.107,
            "spread": 0.07
          }
        },
        "f1": {
          "frozen": {
            "mean": 0.2973,
            "spread": 0.0748
          },
          "finetuned": {
            "mean": 0.491,
            "spread": 0.0869
          },
          "scratch": {
            "mean": 0.2844,
            "spread": 0.0554
          }
        }
      },
      "source": {
        "metrics": {
          "file": "新指标单独汇总.xlsx",
          "sheet": "Sheet1",
          "range": "B5:D5"
        },
        "performance": {
          "file": "结果汇总.xlsx",
          "sheet": "BCIC2A",
          "range": "B5:J5"
        }
      }
    },
    {
      "dataset": "BCIC-2A",
      "model": "EEGPT",
      "metrics": {
        "prr": 1.0736095965103598,
        "acs": 0.9465648854961832,
        "pvs": 0.10180332893857305
      },
      "performance": {
        "bac": {
          "frozen": {
            "mean": 0.5453,
            "spread": 0.0943
          },
          "finetuned": {
            "mean": 0.5251,
            "spread": 0.0649
          },
          "scratch": {
            "mean": 0.5104,
            "spread": 0.0618
          }
        },
        "kappa": {
          "frozen": {
            "mean": 0.3938,
            "spread": 0.1257
          },
          "finetuned": {
            "mean": 0.3668,
            "spread": 0.0866
          },
          "scratch": {
            "mean": 0.3472,
            "spread": 0.0824
          }
        },
        "f1": {
          "frozen": {
            "mean": 0.5334,
            "spread": 0.105
          },
          "finetuned": {
            "mean": 0.5212,
            "spread": 0.0639
          },
          "scratch": {
            "mean": 0.5005,
            "spread": 0.0698
          }
        }
      },
      "source": {
        "metrics": {
          "file": "新指标单独汇总.xlsx",
          "sheet": "Sheet1",
          "range": "B6:D6"
        },
        "performance": {
          "file": "结果汇总.xlsx",
          "sheet": "BCIC2A",
          "range": "B6:J6"
        }
      }
    },
    {
      "dataset": "BCIC-2A",
      "model": "CBraMod",
      "metrics": {
        "prr": 0.5064116496413823,
        "acs": 0.1688763312323408,
        "pvs": 0.6293526643577009
      },
      "performance": {
        "bac": {
          "frozen": {
            "mean": 0.4248,
            "spread": 0.0438
          },
          "finetuned": {
            "mean": 0.5951,
            "spread": 0.069
          },
          "scratch": {
            "mean": 0.3083,
            "spread": 0.0617
          }
        },
        "kappa": {
          "frozen": {
            "mean": 0.233,
            "spread": 0.0584
          },
          "finetuned": {
            "mean": 0.4601,
            "spread": 0.0919
          },
          "scratch": {
            "mean": 0.0777,
            "spread": 0.0823
          }
        },
        "f1": {
          "frozen": {
            "mean": 0.4197,
            "spread": 0.0431
          },
          "finetuned": {
            "mean": 0.5922,
            "spread": 0.0712
          },
          "scratch": {
            "mean": 0.2463,
            "spread": 0.086
          }
        }
      },
      "source": {
        "metrics": {
          "file": "新指标单独汇总.xlsx",
          "sheet": "Sheet1",
          "range": "B7:D7"
        },
        "performance": {
          "file": "结果汇总.xlsx",
          "sheet": "BCIC2A",
          "range": "B7:J7"
        }
      }
    },
    {
      "dataset": "BCIC-2A",
      "model": "CodeBrain",
      "metrics": {
        "prr": 0.498021978021978,
        "acs": 0.730989010989011,
        "pvs": 0.3493288831512326
      },
      "performance": {
        "bac": {
          "frozen": {
            "mean": 0.42,
            "spread": 0.0722
          },
          "finetuned": {
            "mean": 0.5912,
            "spread": 0.0887
          },
          "scratch": {
            "mean": 0.4994,
            "spread": 0.0752
          }
        },
        "kappa": {
          "frozen": {
            "mean": 0.2266,
            "spread": 0.0963
          },
          "finetuned": {
            "mean": 0.455,
            "spread": 0.1183
          },
          "scratch": {
            "mean": 0.3326,
            "spread": 0.1003
          }
        },
        "f1": {
          "frozen": {
            "mean": 0.3975,
            "spread": 0.0777
          },
          "finetuned": {
            "mean": 0.5849,
            "spread": 0.094
          },
          "scratch": {
            "mean": 0.4915,
            "spread": 0.081
          }
        }
      },
      "source": {
        "metrics": {
          "file": "新指标单独汇总.xlsx",
          "sheet": "Sheet1",
          "range": "B8:D8"
        },
        "performance": {
          "file": "结果汇总.xlsx",
          "sheet": "BCIC2A",
          "range": "B8:J8"
        }
      }
    },
    {
      "dataset": "BCIC-2A",
      "model": "SingLEM",
      "metrics": {
        "prr": 0.7897810218978103,
        "acs": 0.9630170316301704,
        "pvs": 0.07065727800380633
      },
      "performance": {
        "bac": {
          "frozen": {
            "mean": 0.4934,
            "spread": 0.0743
          },
          "finetuned": {
            "mean": 0.5583,
            "spread": 0.0775
          },
          "scratch": {
            "mean": 0.5469,
            "spread": 0.0568
          }
        },
        "kappa": {
          "frozen": {
            "mean": 0.3246,
            "spread": 0.0991
          },
          "finetuned": {
            "mean": 0.411,
            "spread": 0.1034
          },
          "scratch": {
            "mean": 0.3958,
            "spread": 0.0757
          }
        },
        "f1": {
          "frozen": {
            "mean": 0.4873,
            "spread": 0.0779
          },
          "finetuned": {
            "mean": 0.5532,
            "spread": 0.078
          },
          "scratch": {
            "mean": 0.5376,
            "spread": 0.0637
          }
        }
      },
      "source": {
        "metrics": {
          "file": "新指标单独汇总.xlsx",
          "sheet": "Sheet1",
          "range": "B9:D9"
        },
        "performance": {
          "file": "结果汇总.xlsx",
          "sheet": "BCIC2A",
          "range": "B9:J9"
        }
      }
    },
    {
      "dataset": "BCIC-2B",
      "model": "BENDR",
      "metrics": {
        "prr": 0.7349137931034483,
        "acs": 1.0330459770114941,
        "pvs": 0.0
      },
      "performance": {
        "bac": {
          "frozen": {
            "mean": 0.6534,
            "spread": 0.0665
          },
          "finetuned": {
            "mean": 0.7088,
            "spread": 0.079
          },
          "scratch": {
            "mean": 0.7157,
            "spread": 0.0646
          }
        },
        "kappa": {
          "frozen": {
            "mean": 0.3069,
            "spread": 0.133
          },
          "finetuned": {
            "mean": 0.4176,
            "spread": 0.1579
          },
          "scratch": {
            "mean": 0.4314,
            "spread": 0.1291
          }
        },
        "auc": {
          "frozen": {
            "mean": 0.6947,
            "spread": 0.0924
          },
          "finetuned": {
            "mean": 0.7715,
            "spread": 0.1037
          },
          "scratch": {
            "mean": 0.7822,
            "spread": 0.0825
          }
        }
      },
      "source": {
        "metrics": {
          "file": "新指标单独汇总.xlsx",
          "sheet": "Sheet1",
          "range": "B11:D11"
        },
        "performance": {
          "file": "结果汇总.xlsx",
          "sheet": "BCIC2B",
          "range": "B3:J3"
        }
      }
    },
    {
      "dataset": "BCIC-2B",
      "model": "BIOT",
      "metrics": {
        "prr": 0.45015842066780404,
        "acs": 1.006093102607848,
        "pvs": 0.0
      },
      "performance": {
        "bac": {
          "frozen": {
            "mean": 0.5923,
            "spread": 0.0613
          },
          "finetuned": {
            "mean": 0.7051,
            "spread": 0.0811
          },
          "scratch": {
            "mean": 0.7064,
            "spread": 0.0769
          }
        },
        "kappa": {
          "frozen": {
            "mean": 0.1847,
            "spread": 0.1225
          },
          "finetuned": {
            "mean": 0.4103,
            "spread": 0.1621
          },
          "scratch": {
            "mean": 0.4128,
            "spread": 0.1539
          }
        },
        "auc": {
          "frozen": {
            "mean": 0.6072,
            "spread": 0.0772
          },
          "finetuned": {
            "mean": 0.7605,
            "spread": 0.106
          },
          "scratch": {
            "mean": 0.7625,
            "spread": 0.1031
          }
        }
      },
      "source": {
        "metrics": {
          "file": "新指标单独汇总.xlsx",
          "sheet": "Sheet1",
          "range": "B12:D12"
        },
        "performance": {
          "file": "结果汇总.xlsx",
          "sheet": "BCIC2B",
          "range": "B4:J4"
        }
      }
    },
    {
      "dataset": "BCIC-2B",
      "model": "LaBraM",
      "metrics": {
        "prr": 0.36337530373315663,
        "acs": 0.41462337088579637,
        "pvs": 0.4484025866788661
      },
      "performance": {
        "bac": {
          "frozen": {
            "mean": 0.5823,
            "spread": 0.0241
          },
          "finetuned": {
            "mean": 0.7263,
            "spread": 0.0704
          },
          "scratch": {
            "mean": 0.5939,
            "spread": 0.0469
          }
        },
        "kappa": {
          "frozen": {
            "mean": 0.1645,
            "spread": 0.0483
          },
          "finetuned": {
            "mean": 0.4527,
            "spread": 0.1407
          },
          "scratch": {
            "mean": 0.1877,
            "spread": 0.0937
          }
        },
        "auc": {
          "frozen": {
            "mean": 0.586,
            "spread": 0.037
          },
          "finetuned": {
            "mean": 0.7901,
            "spread": 0.0878
          },
          "scratch": {
            "mean": 0.6053,
            "spread": 0.0665
          }
        }
      },
      "source": {
        "metrics": {
          "file": "新指标单独汇总.xlsx",
          "sheet": "Sheet1",
          "range": "B13:D13"
        },
        "performance": {
          "file": "结果汇总.xlsx",
          "sheet": "BCIC2B",
          "range": "B5:J5"
        }
      }
    },
    {
      "dataset": "BCIC-2B",
      "model": "EEGPT",
      "metrics": {
        "prr": 1.0069543874002864,
        "acs": 0.8515033749232972,
        "pvs": 0.25882417604978153
      },
      "performance": {
        "bac": {
          "frozen": {
            "mean": 0.7462,
            "spread": 0.0641
          },
          "finetuned": {
            "mean": 0.7444,
            "spread": 0.0568
          },
          "scratch": {
            "mean": 0.7082,
            "spread": 0.0714
          }
        },
        "kappa": {
          "frozen": {
            "mean": 0.4923,
            "spread": 0.1281
          },
          "finetuned": {
            "mean": 0.4889,
            "spread": 0.1135
          },
          "scratch": {
            "mean": 0.4163,
            "spread": 0.1429
          }
        },
        "auc": {
          "frozen": {
            "mean": 0.815,
            "spread": 0.0761
          },
          "finetuned": {
            "mean": 0.8174,
            "spread": 0.0737
          },
          "scratch": {
            "mean": 0.7578,
            "spread": 0.0967
          }
        }
      },
      "source": {
        "metrics": {
          "file": "新指标单独汇总.xlsx",
          "sheet": "Sheet1",
          "range": "B14:D14"
        },
        "performance": {
          "file": "结果汇总.xlsx",
          "sheet": "BCIC2B",
          "range": "B6:J6"
        }
      }
    },
    {
      "dataset": "BCIC-2B",
      "model": "CBraMod",
      "metrics": {
        "prr": 0.6792299898682878,
        "acs": 0.8806484295845998,
        "pvs": 0.20302789344451744
      },
      "performance": {
        "bac": {
          "frozen": {
            "mean": 0.6676,
            "spread": 0.0713
          },
          "finetuned": {
            "mean": 0.7467,
            "spread": 0.064
          },
          "scratch": {
            "mean": 0.7173,
            "spread": 0.0624
          }
        },
        "kappa": {
          "frozen": {
            "mean": 0.3352,
            "spread": 0.1426
          },
          "finetuned": {
            "mean": 0.4935,
            "spread": 0.128
          },
          "scratch": {
            "mean": 0.4346,
            "spread": 0.1248
          }
        },
        "auc": {
          "frozen": {
            "mean": 0.7106,
            "spread": 0.0923
          },
          "finetuned": {
            "mean": 0.8141,
            "spread": 0.074
          },
          "scratch": {
            "mean": 0.7821,
            "spread": 0.0741
          }
        }
      },
      "source": {
        "metrics": {
          "file": "新指标单独汇总.xlsx",
          "sheet": "Sheet1",
          "range": "B15:D15"
        },
        "performance": {
          "file": "结果汇总.xlsx",
          "sheet": "BCIC2B",
          "range": "B7:J7"
        }
      }
    },
    {
      "dataset": "BCIC-2B",
      "model": "CodeBrain",
      "metrics": {
        "prr": 0.7776577355229041,
        "acs": 0.9057908383751081,
        "pvs": 0.1680588712208109
      },
      "performance": {
        "bac": {
          "frozen": {
            "mean": 0.6799,
            "spread": 0.0544
          },
          "finetuned": {
            "mean": 0.7314,
            "spread": 0.063
          },
          "scratch": {
            "mean": 0.7096,
            "spread": 0.0548
          }
        },
        "kappa": {
          "frozen": {
            "mean": 0.3599,
            "spread": 0.1089
          },
          "finetuned": {
            "mean": 0.4628,
            "spread": 0.126
          },
          "scratch": {
            "mean": 0.4192,
            "spread": 0.1095
          }
        },
        "auc": {
          "frozen": {
            "mean": 0.7273,
            "spread": 0.0651
          },
          "finetuned": {
            "mean": 0.7975,
            "spread": 0.0773
          },
          "scratch": {
            "mean": 0.7752,
            "spread": 0.0722
          }
        }
      },
      "source": {
        "metrics": {
          "file": "新指标单独汇总.xlsx",
          "sheet": "Sheet1",
          "range": "B16:D16"
        },
        "performance": {
          "file": "结果汇总.xlsx",
          "sheet": "BCIC2B",
          "range": "B8:J8"
        }
      }
    },
    {
      "dataset": "BCIC-2B",
      "model": "SingLEM",
      "metrics": {
        "prr": 0.818676716917923,
        "acs": 0.9392797319932997,
        "pvs": 0.1130553561458086
      },
      "performance": {
        "bac": {
          "frozen": {
            "mean": 0.6955,
            "spread": 0.09
          },
          "finetuned": {
            "mean": 0.7388,
            "spread": 0.0577
          },
          "scratch": {
            "mean": 0.7243,
            "spread": 0.0707
          }
        },
        "kappa": {
          "frozen": {
            "mean": 0.391,
            "spread": 0.18
          },
          "finetuned": {
            "mean": 0.4776,
            "spread": 0.1154
          },
          "scratch": {
            "mean": 0.4486,
            "spread": 0.1413
          }
        },
        "auc": {
          "frozen": {
            "mean": 0.7486,
            "spread": 0.1105
          },
          "finetuned": {
            "mean": 0.8091,
            "spread": 0.0736
          },
          "scratch": {
            "mean": 0.795,
            "spread": 0.0867
          }
        }
      },
      "source": {
        "metrics": {
          "file": "新指标单独汇总.xlsx",
          "sheet": "Sheet1",
          "range": "B17:D17"
        },
        "performance": {
          "file": "结果汇总.xlsx",
          "sheet": "BCIC2B",
          "range": "B9:J9"
        }
      }
    },
    {
      "dataset": "SEED-IV",
      "model": "BENDR",
      "metrics": {
        "prr": 0.3528294720850741,
        "acs": 0.65894417014812,
        "pvs": 0.3468427651148293
      },
      "performance": {
        "bac": {
          "frozen": {
            "mean": 0.3195,
            "spread": 0.0441
          },
          "finetuned": {
            "mean": 0.4492,
            "spread": 0.0967
          },
          "scratch": {
            "mean": 0.3763,
            "spread": 0.0705
          }
        },
        "kappa": {
          "frozen": {
            "mean": 0.0929,
            "spread": 0.0588
          },
          "finetuned": {
            "mean": 0.2633,
            "spread": 0.1258
          },
          "scratch": {
            "mean": 0.1735,
            "spread": 0.0954
          }
        },
        "f1": {
          "frozen": {
            "mean": 0.3047,
            "spread": 0.0513
          },
          "finetuned": {
            "mean": 0.4498,
            "spread": 0.0957
          },
          "scratch": {
            "mean": 0.3833,
            "spread": 0.0728
          }
        }
      },
      "source": {
        "metrics": {
          "file": "新指标单独汇总.xlsx",
          "sheet": "Sheet1",
          "range": "B19:D19"
        },
        "performance": {
          "file": "结果汇总.xlsx",
          "sheet": "SEEDIV",
          "range": "B3:J3"
        }
      }
    },
    {
      "dataset": "SEED-IV",
      "model": "BIOT",
      "metrics": {
        "prr": 0.7854705021940517,
        "acs": 0.9624573378839589,
        "pvs": 0.07166022354140066
      },
      "performance": {
        "bac": {
          "frozen": {
            "mean": 0.3673,
            "spread": 0.0512
          },
          "finetuned": {
            "mean": 0.4077,
            "spread": 0.0403
          },
          "scratch": {
            "mean": 0.4026,
            "spread": 0.0416
          }
        },
        "kappa": {
          "frozen": {
            "mean": 0.1611,
            "spread": 0.0723
          },
          "finetuned": {
            "mean": 0.2051,
            "spread": 0.0602
          },
          "scratch": {
            "mean": 0.1974,
            "spread": 0.0548
          }
        },
        "f1": {
          "frozen": {
            "mean": 0.3284,
            "spread": 0.0782
          },
          "finetuned": {
            "mean": 0.3485,
            "spread": 0.0859
          },
          "scratch": {
            "mean": 0.3562,
            "spread": 0.056
          }
        }
      },
      "source": {
        "metrics": {
          "file": "新指标单独汇总.xlsx",
          "sheet": "Sheet1",
          "range": "B20:D20"
        },
        "performance": {
          "file": "结果汇总.xlsx",
          "sheet": "SEEDIV",
          "range": "B4:J4"
        }
      }
    },
    {
      "dataset": "SEED-IV",
      "model": "LaBraM",
      "metrics": {
        "prr": 0.8143176733780761,
        "acs": 0.5738255033557047,
        "pvs": 0.5595221524924202
      },
      "performance": {
        "bac": {
          "frozen": {
            "mean": 0.3537,
            "spread": 0.062
          },
          "finetuned": {
            "mean": 0.3858,
            "spread": 0.0399
          },
          "scratch": {
            "mean": 0.3281,
            "spread": 0.0328
          }
        },
        "kappa": {
          "frozen": {
            "mean": 0.1456,
            "spread": 0.0872
          },
          "finetuned": {
            "mean": 0.1788,
            "spread": 0.0493
          },
          "scratch": {
            "mean": 0.1026,
            "spread": 0.0462
          }
        },
        "f1": {
          "frozen": {
            "mean": 0.3164,
            "spread": 0.1036
          },
          "finetuned": {
            "mean": 0.3481,
            "spread": 0.0541
          },
          "scratch": {
            "mean": 0.3184,
            "spread": 0.0405
          }
        }
      },
      "source": {
        "metrics": {
          "file": "新指标单独汇总.xlsx",
          "sheet": "Sheet1",
          "range": "B21:D21"
        },
        "performance": {
          "file": "结果汇总.xlsx",
          "sheet": "SEEDIV",
          "range": "B5:J5"
        }
      }
    },
    {
      "dataset": "SEED-IV",
      "model": "EEGPT",
      "metrics": {
        "prr": 1.3078149920255182,
        "acs": 1.0215311004784688,
        "pvs": 0.0
      },
      "performance": {
        "bac": {
          "frozen": {
            "mean": 0.3706,
            "spread": 0.0428
          },
          "finetuned": {
            "mean": 0.3447,
            "spread": 0.0297
          },
          "scratch": {
            "mean": 0.3459,
            "spread": 0.0232
          }
        },
        "kappa": {
          "frozen": {
            "mean": 0.164,
            "spread": 0.0574
          },
          "finetuned": {
            "mean": 0.1254,
            "spread": 0.0434
          },
          "scratch": {
            "mean": 0.1281,
            "spread": 0.031
          }
        },
        "f1": {
          "frozen": {
            "mean": 0.3658,
            "spread": 0.0488
          },
          "finetuned": {
            "mean": 0.3369,
            "spread": 0.0352
          },
          "scratch": {
            "mean": 0.3429,
            "spread": 0.0231
          }
        }
      },
      "source": {
        "metrics": {
          "file": "新指标单独汇总.xlsx",
          "sheet": "Sheet1",
          "range": "B22:D22"
        },
        "performance": {
          "file": "结果汇总.xlsx",
          "sheet": "SEEDIV",
          "range": "B6:J6"
        }
      }
    },
    {
      "dataset": "SEED-IV",
      "model": "CBraMod",
      "metrics": {
        "prr": 0.6892868363179391,
        "acs": 0.5136663524976437,
        "pvs": 0.5702918346446659
      },
      "performance": {
        "bac": {
          "frozen": {
            "mean": 0.4033,
            "spread": 0.0645
          },
          "finetuned": {
            "mean": 0.4896,
            "spread": 0.0824
          },
          "scratch": {
            "mean": 0.3696,
            "spread": 0.0398
          }
        },
        "kappa": {
          "frozen": {
            "mean": 0.2194,
            "spread": 0.098
          },
          "finetuned": {
            "mean": 0.3183,
            "spread": 0.1076
          },
          "scratch": {
            "mean": 0.1635,
            "spread": 0.0599
          }
        },
        "f1": {
          "frozen": {
            "mean": 0.3685,
            "spread": 0.0823
          },
          "finetuned": {
            "mean": 0.4765,
            "spread": 0.0863
          },
          "scratch": {
            "mean": 0.3331,
            "spread": 0.054
          }
        }
      },
      "source": {
        "metrics": {
          "file": "新指标单独汇总.xlsx",
          "sheet": "Sheet1",
          "range": "B23:D23"
        },
        "performance": {
          "file": "结果汇总.xlsx",
          "sheet": "SEEDIV",
          "range": "B7:J7"
        }
      }
    },
    {
      "dataset": "SEED-IV",
      "model": "CodeBrain",
      "metrics": {
        "prr": 0.9754921655283245,
        "acs": 0.9554037766171153,
        "pvs": 0.08529313144832146
      },
      "performance": {
        "bac": {
          "frozen": {
            "mean": 0.4304,
            "spread": 0.0706
          },
          "finetuned": {
            "mean": 0.4371,
            "spread": 0.061
          },
          "scratch": {
            "mean": 0.4305,
            "spread": 0.0767
          }
        },
        "kappa": {
          "frozen": {
            "mean": 0.2428,
            "spread": 0.1003
          },
          "finetuned": {
            "mean": 0.2489,
            "spread": 0.0769
          },
          "scratch": {
            "mean": 0.2378,
            "spread": 0.0987
          }
        },
        "f1": {
          "frozen": {
            "mean": 0.3821,
            "spread": 0.1077
          },
          "finetuned": {
            "mean": 0.3984,
            "spread": 0.0814
          },
          "scratch": {
            "mean": 0.4084,
            "spread": 0.0799
          }
        }
      },
      "source": {
        "metrics": {
          "file": "新指标单独汇总.xlsx",
          "sheet": "Sheet1",
          "range": "B24:D24"
        },
        "performance": {
          "file": "结果汇总.xlsx",
          "sheet": "SEEDIV",
          "range": "B8:J8"
        }
      }
    },
    {
      "dataset": "SEED-IV",
      "model": "SingLEM",
      "metrics": {
        "prr": 0.722749715153817,
        "acs": 0.8412457273072541,
        "pvs": 0.2603269116193843
      },
      "performance": {
        "bac": {
          "frozen": {
            "mean": 0.3936,
            "spread": 0.073
          },
          "finetuned": {
            "mean": 0.4499,
            "spread": 0.0643
          },
          "scratch": {
            "mean": 0.4189,
            "spread": 0.0511
          }
        },
        "kappa": {
          "frozen": {
            "mean": 0.1903,
            "spread": 0.0951
          },
          "finetuned": {
            "mean": 0.2633,
            "spread": 0.0811
          },
          "scratch": {
            "mean": 0.2215,
            "spread": 0.0675
          }
        },
        "f1": {
          "frozen": {
            "mean": 0.3952,
            "spread": 0.0718
          },
          "finetuned": {
            "mean": 0.4479,
            "spread": 0.0602
          },
          "scratch": {
            "mean": 0.4069,
            "spread": 0.0522
          }
        }
      },
      "source": {
        "metrics": {
          "file": "新指标单独汇总.xlsx",
          "sheet": "Sheet1",
          "range": "B25:D25"
        },
        "performance": {
          "file": "结果汇总.xlsx",
          "sheet": "SEEDIV",
          "range": "B9:J9"
        }
      }
    },
    {
      "dataset": "pBCIW",
      "model": "BENDR",
      "metrics": {
        "prr": 0.21891152325934932,
        "acs": 0.5570082091821222,
        "pvs": 0.29302167146428293
      },
      "performance": {
        "bac": {
          "frozen": {
            "mean": 0.3814,
            "spread": 0.0184
          },
          "finetuned": {
            "mean": 0.5526,
            "spread": 0.0534
          },
          "scratch": {
            "mean": 0.4555,
            "spread": 0.0398
          }
        },
        "kappa": {
          "frozen": {
            "mean": 0.072,
            "spread": 0.0277
          },
          "finetuned": {
            "mean": 0.3289,
            "spread": 0.0801
          },
          "scratch": {
            "mean": 0.1832,
            "spread": 0.0597
          }
        },
        "f1": {
          "frozen": {
            "mean": 0.373,
            "spread": 0.0216
          },
          "finetuned": {
            "mean": 0.5287,
            "spread": 0.0738
          },
          "scratch": {
            "mean": 0.4428,
            "spread": 0.0462
          }
        }
      },
      "source": {
        "metrics": {
          "file": "新指标单独汇总.xlsx",
          "sheet": "Sheet1",
          "range": "B27:D27"
        },
        "performance": {
          "file": "结果汇总.xlsx",
          "sheet": "pBCIW",
          "range": "B3:J3"
        }
      }
    },
    {
      "dataset": "pBCIW",
      "model": "BIOT",
      "metrics": {
        "prr": 0.9218649517684888,
        "acs": 1.0106109324758843,
        "pvs": 0.0
      },
      "performance": {
        "bac": {
          "frozen": {
            "mean": 0.5244,
            "spread": 0.1187
          },
          "finetuned": {
            "mean": 0.5406,
            "spread": 0.1118
          },
          "scratch": {
            "mean": 0.5429,
            "spread": 0.078
          }
        },
        "kappa": {
          "frozen": {
            "mean": 0.2867,
            "spread": 0.178
          },
          "finetuned": {
            "mean": 0.311,
            "spread": 0.1677
          },
          "scratch": {
            "mean": 0.3143,
            "spread": 0.1171
          }
        },
        "f1": {
          "frozen": {
            "mean": 0.4851,
            "spread": 0.15
          },
          "finetuned": {
            "mean": 0.4995,
            "spread": 0.1383
          },
          "scratch": {
            "mean": 0.4964,
            "spread": 0.106
          }
        }
      },
      "source": {
        "metrics": {
          "file": "新指标单独汇总.xlsx",
          "sheet": "Sheet1",
          "range": "B28:D28"
        },
        "performance": {
          "file": "结果汇总.xlsx",
          "sheet": "pBCIW",
          "range": "B4:J4"
        }
      }
    },
    {
      "dataset": "pBCIW",
      "model": "LaBraM",
      "metrics": {
        "prr": 0.6589068825910931,
        "acs": 0.634952766531714,
        "pvs": 0.4698103769117381
      },
      "performance": {
        "bac": {
          "frozen": {
            "mean": 0.4635,
            "spread": 0.0596
          },
          "finetuned": {
            "mean": 0.531,
            "spread": 0.081
          },
          "scratch": {
            "mean": 0.4588,
            "spread": 0.0456
          }
        },
        "kappa": {
          "frozen": {
            "mean": 0.1953,
            "spread": 0.0893
          },
          "finetuned": {
            "mean": 0.2964,
            "spread": 0.1216
          },
          "scratch": {
            "mean": 0.1882,
            "spread": 0.0684
          }
        },
        "f1": {
          "frozen": {
            "mean": 0.4164,
            "spread": 0.0844
          },
          "finetuned": {
            "mean": 0.5106,
            "spread": 0.0929
          },
          "scratch": {
            "mean": 0.4229,
            "spread": 0.0351
          }
        }
      },
      "source": {
        "metrics": {
          "file": "新指标单独汇总.xlsx",
          "sheet": "Sheet1",
          "range": "B29:D29"
        },
        "performance": {
          "file": "结果汇总.xlsx",
          "sheet": "pBCIW",
          "range": "B5:J5"
        }
      }
    },
    {
      "dataset": "pBCIW",
      "model": "EEGPT",
      "metrics": {
        "prr": 1.088852097130243,
        "acs": 0.9850993377483444,
        "pvs": 0.029399006622516606
      },
      "performance": {
        "bac": {
          "frozen": {
            "mean": 0.4649,
            "spread": 0.047
          },
          "finetuned": {
            "mean": 0.4541,
            "spread": 0.0548
          },
          "scratch": {
            "mean": 0.4523,
            "spread": 0.0472
          }
        },
        "kappa": {
          "frozen": {
            "mean": 0.1973,
            "spread": 0.0706
          },
          "finetuned": {
            "mean": 0.1812,
            "spread": 0.0821
          },
          "scratch": {
            "mean": 0.1785,
            "spread": 0.0708
          }
        },
        "f1": {
          "frozen": {
            "mean": 0.4355,
            "spread": 0.0548
          },
          "finetuned": {
            "mean": 0.4296,
            "spread": 0.0605
          },
          "scratch": {
            "mean": 0.4255,
            "spread": 0.0616
          }
        }
      },
      "source": {
        "metrics": {
          "file": "新指标单独汇总.xlsx",
          "sheet": "Sheet1",
          "range": "B30:D30"
        },
        "performance": {
          "file": "结果汇总.xlsx",
          "sheet": "pBCIW",
          "range": "B6:J6"
        }
      }
    },
    {
      "dataset": "pBCIW",
      "model": "CBraMod",
      "metrics": {
        "prr": 0.9361756446259893,
        "acs": 0.9149859586418178,
        "pvs": 0.15587324483022713
      },
      "performance": {
        "bac": {
          "frozen": {
            "mean": 0.5778,
            "spread": 0.1062
          },
          "finetuned": {
            "mean": 0.5945,
            "spread": 0.0905
          },
          "scratch": {
            "mean": 0.5723,
            "spread": 0.0883
          }
        },
        "kappa": {
          "frozen": {
            "mean": 0.3667,
            "spread": 0.1594
          },
          "finetuned": {
            "mean": 0.3917,
            "spread": 0.1357
          },
          "scratch": {
            "mean": 0.3584,
            "spread": 0.1325
          }
        },
        "f1": {
          "frozen": {
            "mean": 0.54,
            "spread": 0.1358
          },
          "finetuned": {
            "mean": 0.5688,
            "spread": 0.1086
          },
          "scratch": {
            "mean": 0.5516,
            "spread": 0.109
          }
        }
      },
      "source": {
        "metrics": {
          "file": "新指标单独汇总.xlsx",
          "sheet": "Sheet1",
          "range": "B31:D31"
        },
        "performance": {
          "file": "结果汇总.xlsx",
          "sheet": "pBCIW",
          "range": "B7:J7"
        }
      }
    },
    {
      "dataset": "pBCIW",
      "model": "CodeBrain",
      "metrics": {
        "prr": 1.103478010922679,
        "acs": 1.022420235699914,
        "pvs": 0.0
      },
      "performance": {
        "bac": {
          "frozen": {
            "mean": 0.5893,
            "spread": 0.0956
          },
          "finetuned": {
            "mean": 0.5653,
            "spread": 0.1129
          },
          "scratch": {
            "mean": 0.5705,
            "spread": 0.067
          }
        },
        "kappa": {
          "frozen": {
            "mean": 0.3839,
            "spread": 0.1434
          },
          "finetuned": {
            "mean": 0.3479,
            "spread": 0.1694
          },
          "scratch": {
            "mean": 0.3557,
            "spread": 0.1005
          }
        },
        "f1": {
          "frozen": {
            "mean": 0.5494,
            "spread": 0.1195
          },
          "finetuned": {
            "mean": 0.538,
            "spread": 0.1281
          },
          "scratch": {
            "mean": 0.5395,
            "spread": 0.0852
          }
        }
      },
      "source": {
        "metrics": {
          "file": "新指标单独汇总.xlsx",
          "sheet": "Sheet1",
          "range": "B32:D32"
        },
        "performance": {
          "file": "结果汇总.xlsx",
          "sheet": "pBCIW",
          "range": "B8:J8"
        }
      }
    },
    {
      "dataset": "pBCIW",
      "model": "SingLEM",
      "metrics": {
        "prr": 0.3967280163599182,
        "acs": 0.9091440257084429,
        "pvs": 0.1478519030412637
      },
      "performance": {
        "bac": {
          "frozen": {
            "mean": 0.4239,
            "spread": 0.0237
          },
          "finetuned": {
            "mean": 0.5615,
            "spread": 0.0938
          },
          "scratch": {
            "mean": 0.5408,
            "spread": 0.0514
          }
        },
        "kappa": {
          "frozen": {
            "mean": 0.1358,
            "spread": 0.0355
          },
          "finetuned": {
            "mean": 0.3423,
            "spread": 0.1407
          },
          "scratch": {
            "mean": 0.3112,
            "spread": 0.0771
          }
        },
        "f1": {
          "frozen": {
            "mean": 0.422,
            "spread": 0.0231
          },
          "finetuned": {
            "mean": 0.5248,
            "spread": 0.1152
          },
          "scratch": {
            "mean": 0.5103,
            "spread": 0.0541
          }
        }
      },
      "source": {
        "metrics": {
          "file": "新指标单独汇总.xlsx",
          "sheet": "Sheet1",
          "range": "B33:D33"
        },
        "performance": {
          "file": "结果汇总.xlsx",
          "sheet": "pBCIW",
          "range": "B9:J9"
        }
      }
    }
  ]
};
