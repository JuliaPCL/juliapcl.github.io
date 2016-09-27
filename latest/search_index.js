var documenterSearchIndex = {"docs": [

{
    "location": "index.html#",
    "page": "Home",
    "title": "Home",
    "category": "page",
    "text": ""
},

{
    "location": "index.html#PCL",
    "page": "Home",
    "title": "PCL",
    "category": "Module",
    "text": "The Julia wrapper for Point Cloud Library (PCL)\n\nWith the packages, e.g., you can visualize a point cloud in 5 lines:\n\nusing PCLCommon, PCLIO, PCLVisualization\ncloud = PointCloud{PointXYZRGB}(\"your_pcd_file.pcd\")\nviewer = PCLVisualizer(\"pcl visualizer\")\naddPointCloud(viewer, cloud, id=\"input\")\nspin(viewer) # you will see the PCLVisualizer\n\n(Image: )\n\nWhy?\n\nPCL.jl was stated to give us fast prototyping using PCL in interactive environment, without much loss of computational efficiency and flexibility.\n\nYou might find that there is already a python binding (strawlab/python-pcl) for the purpose, however, it lacks flexibility in particular; it only supports PointXYZ for point clouds at the moment. I guess the reason why it doesn't support arbitary point types for point clouds is that there is not elegant and simple way to expose C++ templated classes in python (actually I tried, but couldn't figure it out). Since I wanted to use arbiraty point types for point clouds, I decided to create a new one.\n\nThe reasons why I started writing the Julia (not python) binding are:\n\nThe Julia C++ interface Keno/Cxx.jl is quite powerful.\nIt enables us to call C++ functions/methods directly from Julia   without any glue code (unlike cython and swig), embed C++ into Julia and   vise versa.\nJulia's types can be parameterized and exposing C++ templated classes is quite straightfood.\ne.g. C++ pcl::PointCloud<PointT> can be represented as PointCloud{PointT} in Julia\nI thought it's suitable to wrap PCL's heavily templated APIs.\n\nComparison to python-pcl\n\nPros:\n\nSupport arbitaty point types for point clouds, whereas python-pcl only supports PointXYZ\nSupport PCL 1.8 or later\nMore consistent APIs\nCan write mixed C++/Julia\nPCLVisualizer: Jupyter integration using off-screen rendering\n\nCons:\n\nOnly works on osx for now\nHard to build entire dependencies\nSometime segfaults in Cxx.jl and Julia when doing wrong\n\nDependencies (in short)\n\npcl\nJulia\nCxx.jl\n\nAPI guidelines\n\nFunction names should be exactly same between Julia and C++.\nC++ template classes are available in Julia as templated types\nC++ dereferences which sometimes needed in C++, are hidden in implementation in Julia\n\ne.g.\n\nIn C++:\n\npcl::PassThrough<pcl::PointXYZ> pass;\npass.setInputCloud (cloud);\npass.setFilterFieldName (\"z\");\npass.setFilterLimits (0.0, 1.0);\npass.filter (*cloud_filtered);\n\nIn Julia:\n\npass = PassThrough{PointXYZ}()\nsetInputCloud(pass, cloud)\nsetFilterFieldName(pass, \"z\")\nsetFilterLimits(pass, 0.0, 1.0)\nfilter(pass, cloud_filtered)\n\nPackage structure\n\nTo simplify development and minimize dependencies, the Julia wrapper consists of the packages below:\n\nLibPCL.jl\nPCLCommon.jl\nPCLFeatures.jl\nPCLFilters.jl\nPCLIO.jl\nPCLKDTree.jl\nPCLKeyPoints.jl\nPCLOctree.jl\nPCLRecognition.jl\nPCLRegistration.jl\nPCLSampleConsensus.jl\nPCLSearch.jl\nPCLSegmentation.jl\nPCLSurface.jl\nPCLTracking.jl\nPCLVisualization.jl\n\nfollowing the PCL module structure except for the LibPCL.jl which manages binary dependencies (i.e. search installed PCL shared libraries or build and install them if not found).\n\n\n\n"
},

{
    "location": "index.html#PCL.jl-1",
    "page": "Home",
    "title": "PCL.jl",
    "category": "section",
    "text": "The Julia wrapper for Point Cloud Library (PCL)https://github.com/JuliaPCL/PCL.jlPCL"
},

{
    "location": "installation.html#",
    "page": "Installation",
    "title": "Installation",
    "category": "page",
    "text": ""
},

{
    "location": "installation.html#Installation-1",
    "page": "Installation",
    "title": "Installation",
    "category": "section",
    "text": "PCL Julia packages have fairly complex dependencies, so please take a careful look at the installation guide for each dependency."
},

{
    "location": "installation.html#Requirements-1",
    "page": "Installation",
    "title": "Requirements",
    "category": "section",
    "text": ""
},

{
    "location": "installation.html#Platform-1",
    "page": "Installation",
    "title": "Platform",
    "category": "section",
    "text": "Currently only tested on OSX."
},

{
    "location": "installation.html#PCL-1",
    "page": "Installation",
    "title": "PCL",
    "category": "section",
    "text": "You need to install PCL 1.8 or later with shared library option ON. Since PCL have a fair amount of dependencies, you might suffer from build issues. For macOSX, the following command will help to install PCL dependencies:brew install cmake openni openni2 qhull boost glew flann eigen libusb vtk\nexport OPENNI2_INCLUDE=/usr/local/include/ni2\nexport OPENNI2_REDIST=/usr/local/lib/ni2If you have PCL dependencies installed, then recommended installation steps are as follows:git clone https://github.com/PointCloudLibrary/pcl && cd pcl\nmkdir build && cd build\ncmake -DPCL_SHARED_LIBS=ON -DCMAKE_BUILD_TYPE=Release -DBUILD_global_tests=OFF -DBUILD_tools=OFF ..\nmake -j4\nmake -j4 install"
},

{
    "location": "installation.html#Julia-1",
    "page": "Installation",
    "title": "Julia",
    "category": "section",
    "text": "Julia 0.5 or later is required. Install Julia v0.5 from binary distributions or build it from source."
},

{
    "location": "installation.html#Cxx.jl-1",
    "page": "Installation",
    "title": "Cxx.jl",
    "category": "section",
    "text": "You need to install r9y9/Cxx.jl [1]. Building Cxx.jl is a bit complex, as it builds its own llvm and clang by default. Please take a careful look at the installation guide of Cxx.jl. Ideally, the installation can be done as follows:Pkg.clone(\"https://github.com/r9y9/Cxx.jl\")\nPkg.build(\"Cxx\")[1]: Forked from Keno/Cxx.jl for RTTI support. Keno/Cxx.jl doesn't provides a way to enable RTTI without code modification for now."
},

{
    "location": "installation.html#Install-PCL-Julia-packages-1",
    "page": "Installation",
    "title": "Install PCL Julia packages",
    "category": "section",
    "text": ""
},

{
    "location": "installation.html#Set-environmental-variables-property-1",
    "page": "Installation",
    "title": "Set environmental variables property",
    "category": "section",
    "text": "There are a few environmental variables to be set property before installing Julia packages, otherwise it throws errors during package compilation time. You must tell locations of PCL dependencies (boost, FLANN, Eigen and VTK) to Julia via the following environmental variables:Key Default Description\nBOOST_INCLUDE_DIR /usr/local/include (/usr/include/ for linux) Boost include directory\nFLANN_INCLUDE_DIR /usr/local/include (/usr/include/ for linux) Flann include directory\nEIGEN_INCLUDE_DIR /usr/local/include/eigen3 (/usr/include/eigen3 for linux) Eigen include directory\nVTK_INCLUDE_DIR_PARENT /usr/local/include (/usr/include/ for linux) Parent directory for VTK includes\nVTK_INCLUDE_DIR ${VTK_INCLUDE_DIR_PARENT}/vtk-${major}.${minor} VTK include directory (${major} and ${minor} will be automatically detected)"
},

{
    "location": "installation.html#Clone-and-build-1",
    "page": "Installation",
    "title": "Clone and build",
    "category": "section",
    "text": "You are almost there! Clone the packages:Pkg.clone(\"https://github.com/JuliaPCL/PCLCommon.jl\")\nPkg.clone(\"https://github.com/JuliaPCL/PCLIO.jl\")\nPkg.clone(\"https://github.com/JuliaPCL/PCLFeatures.jl\")\nPkg.clone(\"https://github.com/JuliaPCL/PCLFilters.jl\")\nPkg.clone(\"https://github.com/JuliaPCL/PCLVisualization.jl\")\nPkg.clone(\"https://github.com/JuliaPCL/LibPCL.jl\")\nPkg.clone(\"https://github.com/JuliaPCL/PCLKDTree.jl\")\nPkg.clone(\"https://github.com/JuliaPCL/PCLOctree.jl\")\nPkg.clone(\"https://github.com/JuliaPCL/PCLRecognition.jl\")\nPkg.clone(\"https://github.com/JuliaPCL/PCLSampleConsensus.jl\")\nPkg.clone(\"https://github.com/JuliaPCL/PCLSearch.jl\")\nPkg.clone(\"https://github.com/JuliaPCL/PCLSegmentation.jl\")\nPkg.clone(\"https://github.com/JuliaPCL/PCLTracking.jl\")\nPkg.clone(\"https://github.com/JuliaPCL/PCLRegistration.jl\")\nPkg.clone(\"https://github.com/JuliaPCL/PCLKeyPoints.jl\")\nPkg.clone(\"https://github.com/JuliaPCL/PCL.jl\")and then:Pkg.build(\"LibPCL\")which searches installed PCL shared libraries. If it fails, please make sure again that you have set correct environmental variables. If you don't have PCL installed, Pkg.build(\"LibPCL\") will try to build and install them into the LibPCL package directory but not recommended, unless if you have perfect requirements to build PCL."
},

{
    "location": "installation.html#Test-if-the-installation-succeeded-1",
    "page": "Installation",
    "title": "Test if the installation succeeded",
    "category": "section",
    "text": "Pkg.test(\"PCL\")If it succeeded, installation is done. If you encounter errors even though all the previous steps succeeded, please file a bug report."
},

{
    "location": "getting-started.html#",
    "page": "Getting started",
    "title": "Getting started",
    "category": "page",
    "text": ""
},

{
    "location": "getting-started.html#Getting-stareted-1",
    "page": "Getting started",
    "title": "Getting stareted",
    "category": "section",
    "text": "PCL Julia packages follows the PCL module structure. If you need a particular module (e.g. PCLCommon.jl), then you can use the specific module(s) as follows:using PCLCommonIf you want to import all the PCL packages, then:using PCLNote that it will take a few times to load (30 seconds~) since it compiles all the PCL packages."
},

{
    "location": "getting-started.html#PointCloud{PointT}-1",
    "page": "Getting started",
    "title": "PointCloud{PointT}",
    "category": "section",
    "text": "The most frequently used type would be PointCloud(defined in PCLCommon.jl), which represents arbitary point type of point cloud (pcl::PointCloud<PointT>::Ptr in C++). In this section we will show the basic usage of PointCloud type quickly."
},

{
    "location": "getting-started.html#Create-an-empty-point-cloud-1",
    "page": "Getting started",
    "title": "Create an empty point cloud",
    "category": "section",
    "text": "using PCLCommoncloud_xyz = PointCloud{PointXYZ}()For different point types, just change the type parameter as follows:cloud_rgba = PointCloud{PointXYZRGBA}()"
},

{
    "location": "getting-started.html#Create-a-point-cloud-with-specified-size-1",
    "page": "Getting started",
    "title": "Create a point cloud with specified size",
    "category": "section",
    "text": "cloud_xyz = PointCloud{PointXYZ}(100, 200) # width=100, height=200"
},

{
    "location": "getting-started.html#IO-1",
    "page": "Getting started",
    "title": "IO",
    "category": "section",
    "text": ""
},

{
    "location": "getting-started.html#Load-a-PCD-file-1",
    "page": "Getting started",
    "title": "Load a PCD file",
    "category": "section",
    "text": "using PCLCommon\nusing PCLIOcloud_xyz = PointCloud{PointXYZ}(\"your_pcd_data.pcd\")needs PCLIO.jl in addition to PCLCommon.jl."
},

{
    "location": "getting-started.html#Filtering-1",
    "page": "Getting started",
    "title": "Filtering",
    "category": "section",
    "text": ""
},

{
    "location": "getting-started.html#PassThrough-filter-1",
    "page": "Getting started",
    "title": "PassThrough filter",
    "category": "section",
    "text": "using PCLCommon\nusing PCLIO\nusing PCLFilterscloud = PointCloud{PointXYZRGB}(\"your_pcd_file.pcd\")\ncloud_filtered = PointCloud{PointXYZRGB}()\n\npass = PassThrough{PointXYZRGB}()\nsetInputCloud(pass, cloud)\nsetFilterFieldName(pass, \"z\")\nsetFilterLimits(pass, 0.0, 1.0)\nfilter(pass, cloud_filtered)needs PCLFilters.jl."
},

{
    "location": "getting-started.html#Visualization-1",
    "page": "Getting started",
    "title": "Visualization",
    "category": "section",
    "text": "using PCLCommon\nusing PCLIO\nusing PCLVisualizationcloud = PointCloud{PointXYZRGB}(\"your_pcd_file.pcd\")\nviewer = PCLVisualizer(\"pcl visualizer\")\naddPointCloud(viewer, cloud, id=\"input\")\nspin(viewer) # you will see the PCLVisualizerneeds PCLVisualization.jl."
},

{
    "location": "getting-started.html#Examples-and-tutorials-1",
    "page": "Getting started",
    "title": "Examples and tutorials",
    "category": "section",
    "text": "See JuliaPCL/PCL/test directory for more examples. It includes more complex filtering, feature extraction, recognition, tracking and visualization examples and also some PCL tutorial translations as well."
},

{
    "location": "api/common.html#",
    "page": "Common",
    "title": "Common",
    "category": "page",
    "text": ""
},

{
    "location": "api/common.html#PCLCommon",
    "page": "Common",
    "title": "PCLCommon",
    "category": "Module",
    "text": "PCL common types, functions and utilities. The primary export is the PointCloud{PointT} (aliased to PointCloudPtr{PointT}), which represents a shared pointer of a point cloud (i.e. pcl::PointCloud<PointT>::Ptr) in PCL. You can create point clouds as follows:\n\nusing PCLCommon\n\n# Create empty point cloud\ncloud = PointCloud{PointXYZRGBA}()\n\nusing PCLCommon\nusing PCLIO\n\n# Create and load point cloud from a PCD file\ncloud = PointCloud{PointXYZRGB}(\"your_pcd_file.pcd\")\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.jl-1",
    "page": "Common",
    "title": "PCLCommon.jl",
    "category": "section",
    "text": "PCLCommon"
},

{
    "location": "api/common.html#Index-1",
    "page": "Common",
    "title": "Index",
    "category": "section",
    "text": "Modules = [PCLCommon]\nOrder = [:constant, :function, :type, :macro]"
},

{
    "location": "api/common.html#PCLCommon.BoostSharedPtr",
    "page": "Common",
    "title": "PCLCommon.BoostSharedPtr",
    "category": "Constant",
    "text": "boost::shared_ptr<T>\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.PointCloud",
    "page": "Common",
    "title": "PCLCommon.PointCloud",
    "category": "Constant",
    "text": "Pointer representation for pcl::PointCloud<PointT> in C++\n\ntypealias of PointCloudPtr\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.use_count-Tuple{Cxx.CppValue{Cxx.CxxQualType{Cxx.CppTemplate{Cxx.CppBaseType{Symbol(\"boost::shared_ptr\")},Tuple{T}},(false,false,false)},N}}",
    "page": "Common",
    "title": "PCLCommon.use_count",
    "category": "Method",
    "text": "use_count(s)\n\n\nReturns reference count\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.Axis",
    "page": "Common",
    "title": "PCLCommon.Axis",
    "category": "Type",
    "text": "pcl::Axis\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.BRISKSignature512",
    "page": "Common",
    "title": "PCLCommon.BRISKSignature512",
    "category": "Type",
    "text": "pcl::BRISKSignature512\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.Boundary",
    "page": "Common",
    "title": "PCLCommon.Boundary",
    "category": "Type",
    "text": "pcl::Boundary\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.CPPFSignature",
    "page": "Common",
    "title": "PCLCommon.CPPFSignature",
    "category": "Type",
    "text": "pcl::CPPFSignature\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.Correspondence",
    "page": "Common",
    "title": "PCLCommon.Correspondence",
    "category": "Type",
    "text": "Pointer representation for pcl::Correspondence in C++\n\ntypealias of CorrespondencePtr\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.Correspondences",
    "page": "Common",
    "title": "PCLCommon.Correspondences",
    "category": "Type",
    "text": "Pointer representation for pcl::Correspondences in C++\n\ntypealias of CorrespondencesPtr\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.ESFSignature640",
    "page": "Common",
    "title": "PCLCommon.ESFSignature640",
    "category": "Type",
    "text": "pcl::ESFSignature640\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.FPFHSignature33",
    "page": "Common",
    "title": "PCLCommon.FPFHSignature33",
    "category": "Type",
    "text": "pcl::FPFHSignature33\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.GRSDSignature21",
    "page": "Common",
    "title": "PCLCommon.GRSDSignature21",
    "category": "Type",
    "text": "pcl::GRSDSignature21\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.IntensityGradient",
    "page": "Common",
    "title": "PCLCommon.IntensityGradient",
    "category": "Type",
    "text": "pcl::IntensityGradient\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.InterestPoint",
    "page": "Common",
    "title": "PCLCommon.InterestPoint",
    "category": "Type",
    "text": "pcl::InterestPoint\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.Label",
    "page": "Common",
    "title": "PCLCommon.Label",
    "category": "Type",
    "text": "pcl::Label\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.ModelCoefficients",
    "page": "Common",
    "title": "PCLCommon.ModelCoefficients",
    "category": "Type",
    "text": "Pointer representation for pcl::ModelCoefficients in C++\n\ntypealias of ModelCoefficientsPtr\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.MomentInvariants",
    "page": "Common",
    "title": "PCLCommon.MomentInvariants",
    "category": "Type",
    "text": "pcl::MomentInvariants\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.Narf36",
    "page": "Common",
    "title": "PCLCommon.Narf36",
    "category": "Type",
    "text": "pcl::Narf36\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.Normal",
    "page": "Common",
    "title": "PCLCommon.Normal",
    "category": "Type",
    "text": "pcl::Normal\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.NormalBasedSignature12",
    "page": "Common",
    "title": "PCLCommon.NormalBasedSignature12",
    "category": "Type",
    "text": "pcl::NormalBasedSignature12\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.PCLBase",
    "page": "Common",
    "title": "PCLCommon.PCLBase",
    "category": "Type",
    "text": "Similar to pcl::PCLBase, for dispatch\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.PCLPointCloud2",
    "page": "Common",
    "title": "PCLCommon.PCLPointCloud2",
    "category": "Type",
    "text": "Pointer representation for pcl::PCLPointCloud2 in C++\n\ntypealias of PCLPointCloud2Ptr\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.PFHRGBSignature250",
    "page": "Common",
    "title": "PCLCommon.PFHRGBSignature250",
    "category": "Type",
    "text": "pcl::PFHRGBSignature250\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.PFHSignature125",
    "page": "Common",
    "title": "PCLCommon.PFHSignature125",
    "category": "Type",
    "text": "pcl::PFHSignature125\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.PPFRGBSignature",
    "page": "Common",
    "title": "PCLCommon.PPFRGBSignature",
    "category": "Type",
    "text": "pcl::PPFRGBSignature\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.PPFSignature",
    "page": "Common",
    "title": "PCLCommon.PPFSignature",
    "category": "Type",
    "text": "pcl::PPFSignature\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.PointDEM",
    "page": "Common",
    "title": "PCLCommon.PointDEM",
    "category": "Type",
    "text": "pcl::PointDEM\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.PointIndices",
    "page": "Common",
    "title": "PCLCommon.PointIndices",
    "category": "Type",
    "text": "Pointer representation for pcl::PointIndices in C++\n\ntypealias of PointIndicesPtr\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.PointNormal",
    "page": "Common",
    "title": "PCLCommon.PointNormal",
    "category": "Type",
    "text": "pcl::PointNormal\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.PointSurfel",
    "page": "Common",
    "title": "PCLCommon.PointSurfel",
    "category": "Type",
    "text": "pcl::PointSurfel\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.PointUV",
    "page": "Common",
    "title": "PCLCommon.PointUV",
    "category": "Type",
    "text": "pcl::PointUV\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.PointWithRange",
    "page": "Common",
    "title": "PCLCommon.PointWithRange",
    "category": "Type",
    "text": "pcl::PointWithRange\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.PointWithScale",
    "page": "Common",
    "title": "PCLCommon.PointWithScale",
    "category": "Type",
    "text": "pcl::PointWithScale\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.PointWithViewpoint",
    "page": "Common",
    "title": "PCLCommon.PointWithViewpoint",
    "category": "Type",
    "text": "pcl::PointWithViewpoint\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.PointXY",
    "page": "Common",
    "title": "PCLCommon.PointXY",
    "category": "Type",
    "text": "pcl::PointXY\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.PointXYZ",
    "page": "Common",
    "title": "PCLCommon.PointXYZ",
    "category": "Type",
    "text": "pcl::PointXYZ\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.PointXYZHSV",
    "page": "Common",
    "title": "PCLCommon.PointXYZHSV",
    "category": "Type",
    "text": "pcl::PointXYZHSV\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.PointXYZI",
    "page": "Common",
    "title": "PCLCommon.PointXYZI",
    "category": "Type",
    "text": "pcl::PointXYZI\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.PointXYZINormal",
    "page": "Common",
    "title": "PCLCommon.PointXYZINormal",
    "category": "Type",
    "text": "pcl::PointXYZINormal\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.PointXYZL",
    "page": "Common",
    "title": "PCLCommon.PointXYZL",
    "category": "Type",
    "text": "pcl::PointXYZL\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.PointXYZLNormal",
    "page": "Common",
    "title": "PCLCommon.PointXYZLNormal",
    "category": "Type",
    "text": "pcl::PointXYZLNormal\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.PointXYZRGB",
    "page": "Common",
    "title": "PCLCommon.PointXYZRGB",
    "category": "Type",
    "text": "pcl::PointXYZRGB\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.PointXYZRGBA",
    "page": "Common",
    "title": "PCLCommon.PointXYZRGBA",
    "category": "Type",
    "text": "pcl::PointXYZRGBA\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.PointXYZRGBL",
    "page": "Common",
    "title": "PCLCommon.PointXYZRGBL",
    "category": "Type",
    "text": "pcl::PointXYZRGBL\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.PointXYZRGBNormal",
    "page": "Common",
    "title": "PCLCommon.PointXYZRGBNormal",
    "category": "Type",
    "text": "pcl::PointXYZRGBNormal\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.PrincipalCurvatures",
    "page": "Common",
    "title": "PCLCommon.PrincipalCurvatures",
    "category": "Type",
    "text": "pcl::PrincipalCurvatures\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.PrincipalRadiiRSD",
    "page": "Common",
    "title": "PCLCommon.PrincipalRadiiRSD",
    "category": "Type",
    "text": "pcl::PrincipalRadiiRSD\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.RangeImage",
    "page": "Common",
    "title": "PCLCommon.RangeImage",
    "category": "Type",
    "text": "Pointer representation for pcl::RangeImage in C++\n\ntypealias of RangeImagePtr\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.ReferenceFrame",
    "page": "Common",
    "title": "PCLCommon.ReferenceFrame",
    "category": "Type",
    "text": "pcl::ReferenceFrame\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.SHOT1344",
    "page": "Common",
    "title": "PCLCommon.SHOT1344",
    "category": "Type",
    "text": "pcl::SHOT1344\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.SHOT352",
    "page": "Common",
    "title": "PCLCommon.SHOT352",
    "category": "Type",
    "text": "pcl::SHOT352\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.ShapeContext1980",
    "page": "Common",
    "title": "PCLCommon.ShapeContext1980",
    "category": "Type",
    "text": "pcl::ShapeContext1980\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.UniqueShapeContext1960",
    "page": "Common",
    "title": "PCLCommon.UniqueShapeContext1960",
    "category": "Type",
    "text": "pcl::UniqueShapeContext1960\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.VFHSignature308",
    "page": "Common",
    "title": "PCLCommon.VFHSignature308",
    "category": "Type",
    "text": "pcl::VFHSignature308\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.@boostsharedptr-Tuple{Any,Vararg{Any,N}}",
    "page": "Common",
    "title": "PCLCommon.@boostsharedptr",
    "category": "Macro",
    "text": "@boostsharedptr(name, args)\n\n\ncreates boost::shared_ptr expression (for package development)\n\nParameters\n\nname : C++ type name\nargs : argments will be passed to constructor\n\ntemplate parameters in 1st argment and embedding expression in 2nd argment must be escaped.\n\nReturns\n\nhandle : C++ boost shared pointer of a given C++ type name and argments\n\nExample\n\nhandle = @boostsharedptr(\n    \"pcl::visualization::PointCloudColorHandlerRGBField<\\$T>\",\n    \"\\$(cloud.handle)\")\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.@defconstructor-Tuple{Any,Any}",
    "page": "Common",
    "title": "PCLCommon.@defconstructor",
    "category": "Macro",
    "text": "@defconstructor(expr, cxxname)\n\n\nDefines convenient constructor for value types\n\nParameters\n\nexpr : Constructor expression\ncxxname : C++ type name\n\nExamples\n\n@defptrconstructor PointCloudVal{PointT}() \"pcl::PointCloud\"\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.@defpcltype-Tuple{Any,Any}",
    "page": "Common",
    "title": "PCLCommon.@defpcltype",
    "category": "Macro",
    "text": "@defpcltype(expr, cxxname)\n\n\nA macro to define PCL convenient types. Mostly intended to be used by package development.\n\nParameters\n\nexpr : Julia type name (can have type params)\ncxxname : C++ type name\n\nExample\n\n@defpcltype PointCloud{T} \"pcl::PointCloud\"\n\n\nwhich defines Julia wrapper types for C++ types:\n\nPointCloudPtr{T}: boost shared pointer of pcl::PointCloud<T> (i.e. pcl::PointCloud<T>::Ptr) wrapper\nPointCloudVal{T}: pcl::PointCloud<T> value wrapper\nPointCloud{T}: type aliased to PointCloudPtr{T}\n\nand also Cxx types:\n\npclPointCloudPtr{T}: pcl::PointCloud<T>::Ptr\npclPointCloudVal{T}: pcl::PointCloud<T>\n\nWith the combination of @defptrconstructor, you can then use pcl::PointCloud<T>::Ptr (entirely used in PCL tutorials) as follows:\n\ncloud = PointCloud{PointXYZ}()\n\nNote that PointCloud{T} is a Julia wrapper, you can get the C++ representation as PCLCommon.handle(cloud) or use handle = pclPointCloud{PointXYZ}() which returns C++ type.\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.@defptrconstructor-Tuple{Any,Any}",
    "page": "Common",
    "title": "PCLCommon.@defptrconstructor",
    "category": "Macro",
    "text": "@defptrconstructor(expr, cxxname)\n\n\nDefines convenient constructor for point types\n\nParameters\n\nexpr : Constructor expression\ncxxname : C++ type name\n\nExamples\n\n@defptrconstructor PointCloud{PointT}() \"pcl::PointCloud\"\n\n\n\n"
},

{
    "location": "api/common.html#Base.convert-Tuple{Type{PCLCommon.PointCloudPtr{T}},PCLCommon.PointCloudPtr{PointT}}",
    "page": "Common",
    "title": "Base.convert",
    "category": "Method",
    "text": "convert(?, cloud)\n\n\nConverts a point cloud to a different type of point cloud\n\nExamples\n\ncloud = PointCloud{PointXYZRGB}()\nxyz_cloud = convert(PointCloud{PointXYZ}, cloud)\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.deg2rad-Tuple{AbstractFloat}",
    "page": "Common",
    "title": "PCLCommon.deg2rad",
    "category": "Method",
    "text": "pcl::deg2rad\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.CorrespondencePtr",
    "page": "Common",
    "title": "PCLCommon.CorrespondencePtr",
    "category": "Type",
    "text": "Pointer representation for pcl::Correspondence in C++\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.CorrespondenceVal",
    "page": "Common",
    "title": "PCLCommon.CorrespondenceVal",
    "category": "Type",
    "text": "Value representation for pcl::Correspondence in C++\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.CorrespondencesPtr",
    "page": "Common",
    "title": "PCLCommon.CorrespondencesPtr",
    "category": "Type",
    "text": "Pointer representation for pcl::Correspondences in C++\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.CorrespondencesVal",
    "page": "Common",
    "title": "PCLCommon.CorrespondencesVal",
    "category": "Type",
    "text": "Value representation for pcl::Correspondences in C++\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.ModelCoefficientsPtr",
    "page": "Common",
    "title": "PCLCommon.ModelCoefficientsPtr",
    "category": "Type",
    "text": "Pointer representation for pcl::ModelCoefficients in C++\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.ModelCoefficientsVal",
    "page": "Common",
    "title": "PCLCommon.ModelCoefficientsVal",
    "category": "Type",
    "text": "Value representation for pcl::ModelCoefficients in C++\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.PCLPointCloud2Ptr",
    "page": "Common",
    "title": "PCLCommon.PCLPointCloud2Ptr",
    "category": "Type",
    "text": "Pointer representation for pcl::PCLPointCloud2 in C++\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.PCLPointCloud2Val",
    "page": "Common",
    "title": "PCLCommon.PCLPointCloud2Val",
    "category": "Type",
    "text": "Value representation for pcl::PCLPointCloud2 in C++\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.PointCloudPtr",
    "page": "Common",
    "title": "PCLCommon.PointCloudPtr",
    "category": "Type",
    "text": "Pointer representation for pcl::PointCloud<PointT> in C++\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.PointCloudVal",
    "page": "Common",
    "title": "PCLCommon.PointCloudVal",
    "category": "Type",
    "text": "Value representation for pcl::PointCloud<PointT> in C++\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.PointIndicesPtr",
    "page": "Common",
    "title": "PCLCommon.PointIndicesPtr",
    "category": "Type",
    "text": "Pointer representation for pcl::PointIndices in C++\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.PointIndicesVal",
    "page": "Common",
    "title": "PCLCommon.PointIndicesVal",
    "category": "Type",
    "text": "Value representation for pcl::PointIndices in C++\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.RangeImagePtr",
    "page": "Common",
    "title": "PCLCommon.RangeImagePtr",
    "category": "Type",
    "text": "Pointer representation for pcl::RangeImage in C++\n\n\n\n"
},

{
    "location": "api/common.html#PCLCommon.RangeImageVal",
    "page": "Common",
    "title": "PCLCommon.RangeImageVal",
    "category": "Type",
    "text": "Value representation for pcl::RangeImage in C++\n\n\n\n"
},

{
    "location": "api/common.html#Reference-1",
    "page": "Common",
    "title": "Reference",
    "category": "section",
    "text": "Modules = [PCLCommon]\nOrder = [:constant, :function, :type, :macro]"
},

{
    "location": "api/features.html#",
    "page": "Features",
    "title": "Features",
    "category": "page",
    "text": ""
},

{
    "location": "api/features.html#PCLFeatures.jl-1",
    "page": "Features",
    "title": "PCLFeatures.jl",
    "category": "section",
    "text": "PCLFeatures"
},

{
    "location": "api/features.html#Index-1",
    "page": "Features",
    "title": "Index",
    "category": "section",
    "text": "Modules = [PCLFeatures]\nOrder = [:constant, :function, :type, :macro]"
},

{
    "location": "api/features.html#PCLFeatures.BOARDLocalReferenceFrameEstimation",
    "page": "Features",
    "title": "PCLFeatures.BOARDLocalReferenceFrameEstimation",
    "category": "Constant",
    "text": "Pointer representation for pcl::BOARDLocalReferenceFrameEstimation<T,N,F> in C++\n\ntypealias of BOARDLocalReferenceFrameEstimationPtr\n\n\n\n"
},

{
    "location": "api/features.html#PCLFeatures.NormalEstimation",
    "page": "Features",
    "title": "PCLFeatures.NormalEstimation",
    "category": "Constant",
    "text": "Pointer representation for pcl::NormalEstimation<PT,NT> in C++\n\ntypealias of NormalEstimationPtr\n\n\n\n"
},

{
    "location": "api/features.html#PCLFeatures.NormalEstimationOMP",
    "page": "Features",
    "title": "PCLFeatures.NormalEstimationOMP",
    "category": "Constant",
    "text": "Pointer representation for pcl::NormalEstimationOMP<PT,NT> in C++\n\ntypealias of NormalEstimationOMPPtr\n\n\n\n"
},

{
    "location": "api/features.html#PCLFeatures.SHOTEstimation",
    "page": "Features",
    "title": "PCLFeatures.SHOTEstimation",
    "category": "Constant",
    "text": "Pointer representation for pcl::SHOTEstimation<PT,NT,OT> in C++\n\ntypealias of SHOTEstimationPtr\n\n\n\n"
},

{
    "location": "api/features.html#PCLFeatures.SHOTEstimationOMP",
    "page": "Features",
    "title": "PCLFeatures.SHOTEstimationOMP",
    "category": "Constant",
    "text": "Pointer representation for pcl::SHOTEstimationOMP<PT,NT,OT> in C++\n\ntypealias of SHOTEstimationOMPPtr\n\n\n\n"
},

{
    "location": "api/features.html#PCLFeatures.BOARDLocalReferenceFrameEstimationPtr",
    "page": "Features",
    "title": "PCLFeatures.BOARDLocalReferenceFrameEstimationPtr",
    "category": "Type",
    "text": "Pointer representation for pcl::BOARDLocalReferenceFrameEstimation<T,N,F> in C++\n\n\n\n"
},

{
    "location": "api/features.html#PCLFeatures.BOARDLocalReferenceFrameEstimationVal",
    "page": "Features",
    "title": "PCLFeatures.BOARDLocalReferenceFrameEstimationVal",
    "category": "Type",
    "text": "Value representation for pcl::BOARDLocalReferenceFrameEstimation<T,N,F> in C++\n\n\n\n"
},

{
    "location": "api/features.html#PCLFeatures.NormalEstimationOMPPtr",
    "page": "Features",
    "title": "PCLFeatures.NormalEstimationOMPPtr",
    "category": "Type",
    "text": "Pointer representation for pcl::NormalEstimationOMP<PT,NT> in C++\n\n\n\n"
},

{
    "location": "api/features.html#PCLFeatures.NormalEstimationOMPVal",
    "page": "Features",
    "title": "PCLFeatures.NormalEstimationOMPVal",
    "category": "Type",
    "text": "Value representation for pcl::NormalEstimationOMP<PT,NT> in C++\n\n\n\n"
},

{
    "location": "api/features.html#PCLFeatures.NormalEstimationPtr",
    "page": "Features",
    "title": "PCLFeatures.NormalEstimationPtr",
    "category": "Type",
    "text": "Pointer representation for pcl::NormalEstimation<PT,NT> in C++\n\n\n\n"
},

{
    "location": "api/features.html#PCLFeatures.NormalEstimationVal",
    "page": "Features",
    "title": "PCLFeatures.NormalEstimationVal",
    "category": "Type",
    "text": "Value representation for pcl::NormalEstimation<PT,NT> in C++\n\n\n\n"
},

{
    "location": "api/features.html#PCLFeatures.SHOTEstimationOMPPtr",
    "page": "Features",
    "title": "PCLFeatures.SHOTEstimationOMPPtr",
    "category": "Type",
    "text": "Pointer representation for pcl::SHOTEstimationOMP<PT,NT,OT> in C++\n\n\n\n"
},

{
    "location": "api/features.html#PCLFeatures.SHOTEstimationOMPVal",
    "page": "Features",
    "title": "PCLFeatures.SHOTEstimationOMPVal",
    "category": "Type",
    "text": "Value representation for pcl::SHOTEstimationOMP<PT,NT,OT> in C++\n\n\n\n"
},

{
    "location": "api/features.html#PCLFeatures.SHOTEstimationPtr",
    "page": "Features",
    "title": "PCLFeatures.SHOTEstimationPtr",
    "category": "Type",
    "text": "Pointer representation for pcl::SHOTEstimation<PT,NT,OT> in C++\n\n\n\n"
},

{
    "location": "api/features.html#PCLFeatures.SHOTEstimationVal",
    "page": "Features",
    "title": "PCLFeatures.SHOTEstimationVal",
    "category": "Type",
    "text": "Value representation for pcl::SHOTEstimation<PT,NT,OT> in C++\n\n\n\n"
},

{
    "location": "api/features.html#Reference-1",
    "page": "Features",
    "title": "Reference",
    "category": "section",
    "text": "Modules = [PCLFeatures]\nOrder = [:constant, :function, :type, :macro]"
},

{
    "location": "api/filters.html#",
    "page": "Filters",
    "title": "Filters",
    "category": "page",
    "text": ""
},

{
    "location": "api/filters.html#PCLFilters.jl-1",
    "page": "Filters",
    "title": "PCLFilters.jl",
    "category": "section",
    "text": "PCLFilters"
},

{
    "location": "api/filters.html#Index-1",
    "page": "Filters",
    "title": "Index",
    "category": "section",
    "text": "Modules = [PCLFilters]\nOrder = [:constant, :function, :type, :macro]"
},

{
    "location": "api/filters.html#PCLFilters.ApproximateVoxelGrid",
    "page": "Filters",
    "title": "PCLFilters.ApproximateVoxelGrid",
    "category": "Constant",
    "text": "Pointer representation for pcl::ApproximateVoxelGrid<T> in C++\n\ntypealias of ApproximateVoxelGridPtr\n\n\n\n"
},

{
    "location": "api/filters.html#PCLFilters.ExtractIndices",
    "page": "Filters",
    "title": "PCLFilters.ExtractIndices",
    "category": "Constant",
    "text": "Pointer representation for pcl::ExtractIndices<T> in C++\n\ntypealias of ExtractIndicesPtr\n\n\n\n"
},

{
    "location": "api/filters.html#PCLFilters.PassThrough",
    "page": "Filters",
    "title": "PCLFilters.PassThrough",
    "category": "Constant",
    "text": "Pointer representation for pcl::PassThrough<T> in C++\n\ntypealias of PassThroughPtr\n\n\n\n"
},

{
    "location": "api/filters.html#PCLFilters.RadiusOutlierRemoval",
    "page": "Filters",
    "title": "PCLFilters.RadiusOutlierRemoval",
    "category": "Constant",
    "text": "Pointer representation for pcl::RadiusOutlierRemoval<T> in C++\n\ntypealias of RadiusOutlierRemovalPtr\n\n\n\n"
},

{
    "location": "api/filters.html#PCLFilters.StatisticalOutlierRemoval",
    "page": "Filters",
    "title": "PCLFilters.StatisticalOutlierRemoval",
    "category": "Constant",
    "text": "Pointer representation for pcl::StatisticalOutlierRemoval<T> in C++\n\ntypealias of StatisticalOutlierRemovalPtr\n\n\n\n"
},

{
    "location": "api/filters.html#PCLFilters.UniformSampling",
    "page": "Filters",
    "title": "PCLFilters.UniformSampling",
    "category": "Constant",
    "text": "Pointer representation for pcl::UniformSampling<T> in C++\n\ntypealias of UniformSamplingPtr\n\n\n\n"
},

{
    "location": "api/filters.html#PCLFilters.VoxelGrid",
    "page": "Filters",
    "title": "PCLFilters.VoxelGrid",
    "category": "Constant",
    "text": "Pointer representation for pcl::VoxelGrid<T> in C++\n\ntypealias of VoxelGridPtr\n\n\n\n"
},

{
    "location": "api/filters.html#PCLFilters.ApproximateVoxelGridPtr",
    "page": "Filters",
    "title": "PCLFilters.ApproximateVoxelGridPtr",
    "category": "Type",
    "text": "Pointer representation for pcl::ApproximateVoxelGrid<T> in C++\n\n\n\n"
},

{
    "location": "api/filters.html#PCLFilters.ApproximateVoxelGridVal",
    "page": "Filters",
    "title": "PCLFilters.ApproximateVoxelGridVal",
    "category": "Type",
    "text": "Value representation for pcl::ApproximateVoxelGrid<T> in C++\n\n\n\n"
},

{
    "location": "api/filters.html#PCLFilters.ExtractIndicesPtr",
    "page": "Filters",
    "title": "PCLFilters.ExtractIndicesPtr",
    "category": "Type",
    "text": "Pointer representation for pcl::ExtractIndices<T> in C++\n\n\n\n"
},

{
    "location": "api/filters.html#PCLFilters.ExtractIndicesVal",
    "page": "Filters",
    "title": "PCLFilters.ExtractIndicesVal",
    "category": "Type",
    "text": "Value representation for pcl::ExtractIndices<T> in C++\n\n\n\n"
},

{
    "location": "api/filters.html#PCLFilters.PassThroughPtr",
    "page": "Filters",
    "title": "PCLFilters.PassThroughPtr",
    "category": "Type",
    "text": "Pointer representation for pcl::PassThrough<T> in C++\n\n\n\n"
},

{
    "location": "api/filters.html#PCLFilters.PassThroughVal",
    "page": "Filters",
    "title": "PCLFilters.PassThroughVal",
    "category": "Type",
    "text": "Value representation for pcl::PassThrough<T> in C++\n\n\n\n"
},

{
    "location": "api/filters.html#PCLFilters.RadiusOutlierRemovalPtr",
    "page": "Filters",
    "title": "PCLFilters.RadiusOutlierRemovalPtr",
    "category": "Type",
    "text": "Pointer representation for pcl::RadiusOutlierRemoval<T> in C++\n\n\n\n"
},

{
    "location": "api/filters.html#PCLFilters.RadiusOutlierRemovalVal",
    "page": "Filters",
    "title": "PCLFilters.RadiusOutlierRemovalVal",
    "category": "Type",
    "text": "Value representation for pcl::RadiusOutlierRemoval<T> in C++\n\n\n\n"
},

{
    "location": "api/filters.html#PCLFilters.StatisticalOutlierRemovalPtr",
    "page": "Filters",
    "title": "PCLFilters.StatisticalOutlierRemovalPtr",
    "category": "Type",
    "text": "Pointer representation for pcl::StatisticalOutlierRemoval<T> in C++\n\n\n\n"
},

{
    "location": "api/filters.html#PCLFilters.StatisticalOutlierRemovalVal",
    "page": "Filters",
    "title": "PCLFilters.StatisticalOutlierRemovalVal",
    "category": "Type",
    "text": "Value representation for pcl::StatisticalOutlierRemoval<T> in C++\n\n\n\n"
},

{
    "location": "api/filters.html#PCLFilters.UniformSamplingPtr",
    "page": "Filters",
    "title": "PCLFilters.UniformSamplingPtr",
    "category": "Type",
    "text": "Pointer representation for pcl::UniformSampling<T> in C++\n\n\n\n"
},

{
    "location": "api/filters.html#PCLFilters.UniformSamplingVal",
    "page": "Filters",
    "title": "PCLFilters.UniformSamplingVal",
    "category": "Type",
    "text": "Value representation for pcl::UniformSampling<T> in C++\n\n\n\n"
},

{
    "location": "api/filters.html#PCLFilters.VoxelGridPtr",
    "page": "Filters",
    "title": "PCLFilters.VoxelGridPtr",
    "category": "Type",
    "text": "Pointer representation for pcl::VoxelGrid<T> in C++\n\n\n\n"
},

{
    "location": "api/filters.html#PCLFilters.VoxelGridVal",
    "page": "Filters",
    "title": "PCLFilters.VoxelGridVal",
    "category": "Type",
    "text": "Value representation for pcl::VoxelGrid<T> in C++\n\n\n\n"
},

{
    "location": "api/filters.html#Reference-1",
    "page": "Filters",
    "title": "Reference",
    "category": "section",
    "text": "Modules = [PCLFilters]\nOrder = [:constant, :function, :type, :macro]"
},

{
    "location": "api/io.html#",
    "page": "IO",
    "title": "IO",
    "category": "page",
    "text": ""
},

{
    "location": "api/io.html#PCLIO.jl-1",
    "page": "IO",
    "title": "PCLIO.jl",
    "category": "section",
    "text": "PCLIO"
},

{
    "location": "api/io.html#Index-1",
    "page": "IO",
    "title": "Index",
    "category": "section",
    "text": "Modules = [PCLIO]\nOrder = [:constant, :function, :type, :macro]"
},

{
    "location": "api/io.html#Reference-1",
    "page": "IO",
    "title": "Reference",
    "category": "section",
    "text": "Modules = [PCLIO]\nOrder = [:constant, :function, :type, :macro]"
},

{
    "location": "api/kdtree.html#",
    "page": "KDTree",
    "title": "KDTree",
    "category": "page",
    "text": ""
},

{
    "location": "api/kdtree.html#PCLKDTree.jl-1",
    "page": "KDTree",
    "title": "PCLKDTree.jl",
    "category": "section",
    "text": "PCLKDTree"
},

{
    "location": "api/kdtree.html#Index-1",
    "page": "KDTree",
    "title": "Index",
    "category": "section",
    "text": "Modules = [PCLKDTree]\nOrder = [:constant, :function, :type, :macro]"
},

{
    "location": "api/kdtree.html#PCLKDTree.KdTreeFLANN",
    "page": "KDTree",
    "title": "PCLKDTree.KdTreeFLANN",
    "category": "Constant",
    "text": "Pointer representation for pcl::KdTreeFLANN<T> in C++\n\ntypealias of KdTreeFLANNPtr\n\n\n\n"
},

{
    "location": "api/kdtree.html#PCLKDTree.KdTreeFLANNPtr",
    "page": "KDTree",
    "title": "PCLKDTree.KdTreeFLANNPtr",
    "category": "Type",
    "text": "Pointer representation for pcl::KdTreeFLANN<T> in C++\n\n\n\n"
},

{
    "location": "api/kdtree.html#PCLKDTree.KdTreeFLANNVal",
    "page": "KDTree",
    "title": "PCLKDTree.KdTreeFLANNVal",
    "category": "Type",
    "text": "Value representation for pcl::KdTreeFLANN<T> in C++\n\n\n\n"
},

{
    "location": "api/kdtree.html#Reference-1",
    "page": "KDTree",
    "title": "Reference",
    "category": "section",
    "text": "Modules = [PCLKDTree]\nOrder = [:constant, :function, :type, :macro]"
},

{
    "location": "api/keypoints.html#",
    "page": "KeyPoints",
    "title": "KeyPoints",
    "category": "page",
    "text": ""
},

{
    "location": "api/keypoints.html#PCLKeyPoints.jl-1",
    "page": "KeyPoints",
    "title": "PCLKeyPoints.jl",
    "category": "section",
    "text": "PCLKeyPoints"
},

{
    "location": "api/keypoints.html#Index-1",
    "page": "KeyPoints",
    "title": "Index",
    "category": "section",
    "text": "Modules = [PCLKeyPoints]\nOrder = [:constant, :function, :type, :macro]"
},

{
    "location": "api/keypoints.html#Reference-1",
    "page": "KeyPoints",
    "title": "Reference",
    "category": "section",
    "text": "Modules = [PCLKeyPoints]\nOrder = [:constant, :function, :type, :macro]"
},

{
    "location": "api/octree.html#",
    "page": "Octree",
    "title": "Octree",
    "category": "page",
    "text": ""
},

{
    "location": "api/octree.html#PCLOctree.jl-1",
    "page": "Octree",
    "title": "PCLOctree.jl",
    "category": "section",
    "text": "PCLOctree"
},

{
    "location": "api/octree.html#Index-1",
    "page": "Octree",
    "title": "Index",
    "category": "section",
    "text": "Modules = [PCLOctree]\nOrder = [:constant, :function, :type, :macro]"
},

{
    "location": "api/octree.html#Reference-1",
    "page": "Octree",
    "title": "Reference",
    "category": "section",
    "text": "Modules = [PCLOctree]\nOrder = [:constant, :function, :type, :macro]"
},

{
    "location": "api/recognition.html#",
    "page": "Recognition",
    "title": "Recognition",
    "category": "page",
    "text": ""
},

{
    "location": "api/recognition.html#PCLRecognition.jl-1",
    "page": "Recognition",
    "title": "PCLRecognition.jl",
    "category": "section",
    "text": "PCLRecognition"
},

{
    "location": "api/recognition.html#Index-1",
    "page": "Recognition",
    "title": "Index",
    "category": "section",
    "text": "Modules = [PCLRecognition]\nOrder = [:constant, :function, :type, :macro]"
},

{
    "location": "api/recognition.html#PCLRecognition.GeometricConsistencyGrouping",
    "page": "Recognition",
    "title": "PCLRecognition.GeometricConsistencyGrouping",
    "category": "Constant",
    "text": "Pointer representation for pcl::GeometricConsistencyGrouping<MT,ST> in C++\n\ntypealias of GeometricConsistencyGroupingPtr\n\n\n\n"
},

{
    "location": "api/recognition.html#PCLRecognition.GlobalHypothesesVerification",
    "page": "Recognition",
    "title": "PCLRecognition.GlobalHypothesesVerification",
    "category": "Constant",
    "text": "Pointer representation for pcl::GlobalHypothesesVerification<MT,ST> in C++\n\ntypealias of GlobalHypothesesVerificationPtr\n\n\n\n"
},

{
    "location": "api/recognition.html#PCLRecognition.Hough3DGrouping",
    "page": "Recognition",
    "title": "PCLRecognition.Hough3DGrouping",
    "category": "Constant",
    "text": "Pointer representation for pcl::Hough3DGrouping<T1,T2,R1,R2> in C++\n\ntypealias of Hough3DGroupingPtr\n\n\n\n"
},

{
    "location": "api/recognition.html#PCLRecognition.GeometricConsistencyGroupingPtr",
    "page": "Recognition",
    "title": "PCLRecognition.GeometricConsistencyGroupingPtr",
    "category": "Type",
    "text": "Pointer representation for pcl::GeometricConsistencyGrouping<MT,ST> in C++\n\n\n\n"
},

{
    "location": "api/recognition.html#PCLRecognition.GeometricConsistencyGroupingVal",
    "page": "Recognition",
    "title": "PCLRecognition.GeometricConsistencyGroupingVal",
    "category": "Type",
    "text": "Value representation for pcl::GeometricConsistencyGrouping<MT,ST> in C++\n\n\n\n"
},

{
    "location": "api/recognition.html#PCLRecognition.GlobalHypothesesVerificationPtr",
    "page": "Recognition",
    "title": "PCLRecognition.GlobalHypothesesVerificationPtr",
    "category": "Type",
    "text": "Pointer representation for pcl::GlobalHypothesesVerification<MT,ST> in C++\n\n\n\n"
},

{
    "location": "api/recognition.html#PCLRecognition.GlobalHypothesesVerificationVal",
    "page": "Recognition",
    "title": "PCLRecognition.GlobalHypothesesVerificationVal",
    "category": "Type",
    "text": "Value representation for pcl::GlobalHypothesesVerification<MT,ST> in C++\n\n\n\n"
},

{
    "location": "api/recognition.html#PCLRecognition.Hough3DGroupingPtr",
    "page": "Recognition",
    "title": "PCLRecognition.Hough3DGroupingPtr",
    "category": "Type",
    "text": "Pointer representation for pcl::Hough3DGrouping<T1,T2,R1,R2> in C++\n\n\n\n"
},

{
    "location": "api/recognition.html#PCLRecognition.Hough3DGroupingVal",
    "page": "Recognition",
    "title": "PCLRecognition.Hough3DGroupingVal",
    "category": "Type",
    "text": "Value representation for pcl::Hough3DGrouping<T1,T2,R1,R2> in C++\n\n\n\n"
},

{
    "location": "api/recognition.html#Reference-1",
    "page": "Recognition",
    "title": "Reference",
    "category": "section",
    "text": "Modules = [PCLRecognition]\nOrder = [:constant, :function, :type, :macro]"
},

{
    "location": "api/registration.html#",
    "page": "Registration",
    "title": "Registration",
    "category": "page",
    "text": ""
},

{
    "location": "api/registration.html#PCLRegistration.jl-1",
    "page": "Registration",
    "title": "PCLRegistration.jl",
    "category": "section",
    "text": "PCLRegistration"
},

{
    "location": "api/registration.html#Index-1",
    "page": "Registration",
    "title": "Index",
    "category": "section",
    "text": "Modules = [PCLRegistration]\nOrder = [:constant, :function, :type, :macro]"
},

{
    "location": "api/registration.html#PCLRegistration.IterativeClosestPoint",
    "page": "Registration",
    "title": "PCLRegistration.IterativeClosestPoint",
    "category": "Constant",
    "text": "Pointer representation for pcl::IterativeClosestPoint<T1,T2> in C++\n\ntypealias of IterativeClosestPointPtr\n\n\n\n"
},

{
    "location": "api/registration.html#PCLRegistration.IterativeClosestPointPtr",
    "page": "Registration",
    "title": "PCLRegistration.IterativeClosestPointPtr",
    "category": "Type",
    "text": "Pointer representation for pcl::IterativeClosestPoint<T1,T2> in C++\n\n\n\n"
},

{
    "location": "api/registration.html#PCLRegistration.IterativeClosestPointVal",
    "page": "Registration",
    "title": "PCLRegistration.IterativeClosestPointVal",
    "category": "Type",
    "text": "Value representation for pcl::IterativeClosestPoint<T1,T2> in C++\n\n\n\n"
},

{
    "location": "api/registration.html#Reference-1",
    "page": "Registration",
    "title": "Reference",
    "category": "section",
    "text": "Modules = [PCLRegistration]\nOrder = [:constant, :function, :type, :macro]"
},

{
    "location": "api/sampleconsensus.html#",
    "page": "SampleConsensus",
    "title": "SampleConsensus",
    "category": "page",
    "text": ""
},

{
    "location": "api/sampleconsensus.html#PCLSampleConsensus.jl-1",
    "page": "SampleConsensus",
    "title": "PCLSampleConsensus.jl",
    "category": "section",
    "text": "PCLSampleConsensus"
},

{
    "location": "api/sampleconsensus.html#Index-1",
    "page": "SampleConsensus",
    "title": "Index",
    "category": "section",
    "text": "Modules = [PCLSampleConsensus]\nOrder = [:constant, :function, :type, :macro]"
},

{
    "location": "api/sampleconsensus.html#PCLSampleConsensus.SACMODEL_CIRCLE2D",
    "page": "SampleConsensus",
    "title": "PCLSampleConsensus.SACMODEL_CIRCLE2D",
    "category": "Constant",
    "text": "pcl::SACMODEL_CIRCLE2D\n\n\n\n"
},

{
    "location": "api/sampleconsensus.html#PCLSampleConsensus.SACMODEL_CIRCLE3D",
    "page": "SampleConsensus",
    "title": "PCLSampleConsensus.SACMODEL_CIRCLE3D",
    "category": "Constant",
    "text": "pcl::SACMODEL_CIRCLE3D\n\n\n\n"
},

{
    "location": "api/sampleconsensus.html#PCLSampleConsensus.SACMODEL_CONE",
    "page": "SampleConsensus",
    "title": "PCLSampleConsensus.SACMODEL_CONE",
    "category": "Constant",
    "text": "pcl::SACMODEL_CONE\n\n\n\n"
},

{
    "location": "api/sampleconsensus.html#PCLSampleConsensus.SACMODEL_CYLINDER",
    "page": "SampleConsensus",
    "title": "PCLSampleConsensus.SACMODEL_CYLINDER",
    "category": "Constant",
    "text": "pcl::SACMODEL_CYLINDER\n\n\n\n"
},

{
    "location": "api/sampleconsensus.html#PCLSampleConsensus.SACMODEL_LINE",
    "page": "SampleConsensus",
    "title": "PCLSampleConsensus.SACMODEL_LINE",
    "category": "Constant",
    "text": "pcl::SACMODEL_LINE\n\n\n\n"
},

{
    "location": "api/sampleconsensus.html#PCLSampleConsensus.SACMODEL_NORMAL_PARALLEL_PLANE",
    "page": "SampleConsensus",
    "title": "PCLSampleConsensus.SACMODEL_NORMAL_PARALLEL_PLANE",
    "category": "Constant",
    "text": "pcl::SACMODEL_NORMAL_PARALLEL_PLANE\n\n\n\n"
},

{
    "location": "api/sampleconsensus.html#PCLSampleConsensus.SACMODEL_NORMAL_PLANE",
    "page": "SampleConsensus",
    "title": "PCLSampleConsensus.SACMODEL_NORMAL_PLANE",
    "category": "Constant",
    "text": "pcl::SACMODEL_NORMAL_PLANE\n\n\n\n"
},

{
    "location": "api/sampleconsensus.html#PCLSampleConsensus.SACMODEL_NORMAL_SPHERE",
    "page": "SampleConsensus",
    "title": "PCLSampleConsensus.SACMODEL_NORMAL_SPHERE",
    "category": "Constant",
    "text": "pcl::SACMODEL_NORMAL_SPHERE\n\n\n\n"
},

{
    "location": "api/sampleconsensus.html#PCLSampleConsensus.SACMODEL_PARALLEL_LINE",
    "page": "SampleConsensus",
    "title": "PCLSampleConsensus.SACMODEL_PARALLEL_LINE",
    "category": "Constant",
    "text": "pcl::SACMODEL_PARALLEL_LINE\n\n\n\n"
},

{
    "location": "api/sampleconsensus.html#PCLSampleConsensus.SACMODEL_PARALLEL_LINES",
    "page": "SampleConsensus",
    "title": "PCLSampleConsensus.SACMODEL_PARALLEL_LINES",
    "category": "Constant",
    "text": "pcl::SACMODEL_PARALLEL_LINES\n\n\n\n"
},

{
    "location": "api/sampleconsensus.html#PCLSampleConsensus.SACMODEL_PARALLEL_PLANE",
    "page": "SampleConsensus",
    "title": "PCLSampleConsensus.SACMODEL_PARALLEL_PLANE",
    "category": "Constant",
    "text": "pcl::SACMODEL_PARALLEL_PLANE\n\n\n\n"
},

{
    "location": "api/sampleconsensus.html#PCLSampleConsensus.SACMODEL_PERPENDICULAR_PLANE",
    "page": "SampleConsensus",
    "title": "PCLSampleConsensus.SACMODEL_PERPENDICULAR_PLANE",
    "category": "Constant",
    "text": "pcl::SACMODEL_PERPENDICULAR_PLANE\n\n\n\n"
},

{
    "location": "api/sampleconsensus.html#PCLSampleConsensus.SACMODEL_PLANE",
    "page": "SampleConsensus",
    "title": "PCLSampleConsensus.SACMODEL_PLANE",
    "category": "Constant",
    "text": "pcl::SACMODEL_PLANE\n\n\n\n"
},

{
    "location": "api/sampleconsensus.html#PCLSampleConsensus.SACMODEL_REGISTRATION",
    "page": "SampleConsensus",
    "title": "PCLSampleConsensus.SACMODEL_REGISTRATION",
    "category": "Constant",
    "text": "pcl::SACMODEL_REGISTRATION\n\n\n\n"
},

{
    "location": "api/sampleconsensus.html#PCLSampleConsensus.SACMODEL_REGISTRATION_2D",
    "page": "SampleConsensus",
    "title": "PCLSampleConsensus.SACMODEL_REGISTRATION_2D",
    "category": "Constant",
    "text": "pcl::SACMODEL_REGISTRATION_2D\n\n\n\n"
},

{
    "location": "api/sampleconsensus.html#PCLSampleConsensus.SACMODEL_SPHERE",
    "page": "SampleConsensus",
    "title": "PCLSampleConsensus.SACMODEL_SPHERE",
    "category": "Constant",
    "text": "pcl::SACMODEL_SPHERE\n\n\n\n"
},

{
    "location": "api/sampleconsensus.html#PCLSampleConsensus.SACMODEL_STICK",
    "page": "SampleConsensus",
    "title": "PCLSampleConsensus.SACMODEL_STICK",
    "category": "Constant",
    "text": "pcl::SACMODEL_STICK\n\n\n\n"
},

{
    "location": "api/sampleconsensus.html#PCLSampleConsensus.SACMODEL_TORUS",
    "page": "SampleConsensus",
    "title": "PCLSampleConsensus.SACMODEL_TORUS",
    "category": "Constant",
    "text": "pcl::SACMODEL_TORUS\n\n\n\n"
},

{
    "location": "api/sampleconsensus.html#PCLSampleConsensus.SAC_LMEDS",
    "page": "SampleConsensus",
    "title": "PCLSampleConsensus.SAC_LMEDS",
    "category": "Constant",
    "text": "pcl::SAC_LMEDS\n\n\n\n"
},

{
    "location": "api/sampleconsensus.html#PCLSampleConsensus.SAC_MLESAC",
    "page": "SampleConsensus",
    "title": "PCLSampleConsensus.SAC_MLESAC",
    "category": "Constant",
    "text": "pcl::SAC_MLESAC\n\n\n\n"
},

{
    "location": "api/sampleconsensus.html#PCLSampleConsensus.SAC_MSAC",
    "page": "SampleConsensus",
    "title": "PCLSampleConsensus.SAC_MSAC",
    "category": "Constant",
    "text": "pcl::SAC_MSAC\n\n\n\n"
},

{
    "location": "api/sampleconsensus.html#PCLSampleConsensus.SAC_PROSAC",
    "page": "SampleConsensus",
    "title": "PCLSampleConsensus.SAC_PROSAC",
    "category": "Constant",
    "text": "pcl::SAC_PROSAC\n\n\n\n"
},

{
    "location": "api/sampleconsensus.html#PCLSampleConsensus.SAC_RANSAC",
    "page": "SampleConsensus",
    "title": "PCLSampleConsensus.SAC_RANSAC",
    "category": "Constant",
    "text": "pcl::SAC_RANSAC\n\n\n\n"
},

{
    "location": "api/sampleconsensus.html#PCLSampleConsensus.SAC_RMSAC",
    "page": "SampleConsensus",
    "title": "PCLSampleConsensus.SAC_RMSAC",
    "category": "Constant",
    "text": "pcl::SAC_RMSAC\n\n\n\n"
},

{
    "location": "api/sampleconsensus.html#PCLSampleConsensus.SAC_RRANSAC",
    "page": "SampleConsensus",
    "title": "PCLSampleConsensus.SAC_RRANSAC",
    "category": "Constant",
    "text": "pcl::SAC_RRANSAC\n\n\n\n"
},

{
    "location": "api/sampleconsensus.html#Reference-1",
    "page": "SampleConsensus",
    "title": "Reference",
    "category": "section",
    "text": "Modules = [PCLSampleConsensus]\nOrder = [:constant, :function, :type, :macro]"
},

{
    "location": "api/search.html#",
    "page": "Search",
    "title": "Search",
    "category": "page",
    "text": ""
},

{
    "location": "api/search.html#PCLSearch.jl-1",
    "page": "Search",
    "title": "PCLSearch.jl",
    "category": "section",
    "text": "PCLSearch"
},

{
    "location": "api/search.html#Index-1",
    "page": "Search",
    "title": "Index",
    "category": "section",
    "text": "Modules = [PCLSearch]\nOrder = [:constant, :function, :type, :macro]"
},

{
    "location": "api/search.html#PCLSearch.KdTree",
    "page": "Search",
    "title": "PCLSearch.KdTree",
    "category": "Constant",
    "text": "Pointer representation for pcl::search::KdTree<T> in C++\n\ntypealias of KdTreePtr\n\n\n\n"
},

{
    "location": "api/search.html#PCLSearch.Octree",
    "page": "Search",
    "title": "PCLSearch.Octree",
    "category": "Constant",
    "text": "Pointer representation for pcl::search::Octree<T> in C++\n\ntypealias of OctreePtr\n\n\n\n"
},

{
    "location": "api/search.html#PCLSearch.KdTreePtr",
    "page": "Search",
    "title": "PCLSearch.KdTreePtr",
    "category": "Type",
    "text": "Pointer representation for pcl::search::KdTree<T> in C++\n\n\n\n"
},

{
    "location": "api/search.html#PCLSearch.KdTreeVal",
    "page": "Search",
    "title": "PCLSearch.KdTreeVal",
    "category": "Type",
    "text": "Value representation for pcl::search::KdTree<T> in C++\n\n\n\n"
},

{
    "location": "api/search.html#PCLSearch.OctreePtr",
    "page": "Search",
    "title": "PCLSearch.OctreePtr",
    "category": "Type",
    "text": "Pointer representation for pcl::search::Octree<T> in C++\n\n\n\n"
},

{
    "location": "api/search.html#PCLSearch.OctreeVal",
    "page": "Search",
    "title": "PCLSearch.OctreeVal",
    "category": "Type",
    "text": "Value representation for pcl::search::Octree<T> in C++\n\n\n\n"
},

{
    "location": "api/search.html#Reference-1",
    "page": "Search",
    "title": "Reference",
    "category": "section",
    "text": "Modules = [PCLSearch]\nOrder = [:constant, :function, :type, :macro]"
},

{
    "location": "api/segmentation.html#",
    "page": "Segmentation",
    "title": "Segmentation",
    "category": "page",
    "text": ""
},

{
    "location": "api/segmentation.html#PCLSegmentation.jl-1",
    "page": "Segmentation",
    "title": "PCLSegmentation.jl",
    "category": "section",
    "text": "PCLSegmentation"
},

{
    "location": "api/segmentation.html#Index-1",
    "page": "Segmentation",
    "title": "Index",
    "category": "section",
    "text": "Modules = [PCLSegmentation]\nOrder = [:constant, :function, :type, :macro]"
},

{
    "location": "api/segmentation.html#PCLSegmentation.RegionGrowingRGB",
    "page": "Segmentation",
    "title": "PCLSegmentation.RegionGrowingRGB",
    "category": "Constant",
    "text": "Pointer representation for pcl::RegionGrowingRGB<T> in C++\n\ntypealias of RegionGrowingRGBPtr\n\n\n\n"
},

{
    "location": "api/segmentation.html#PCLSegmentation.SACSegmentation",
    "page": "Segmentation",
    "title": "PCLSegmentation.SACSegmentation",
    "category": "Constant",
    "text": "Pointer representation for pcl::SACSegmentation<T> in C++\n\ntypealias of SACSegmentationPtr\n\n\n\n"
},

{
    "location": "api/segmentation.html#PCLSegmentation.RegionGrowingRGBPtr",
    "page": "Segmentation",
    "title": "PCLSegmentation.RegionGrowingRGBPtr",
    "category": "Type",
    "text": "Pointer representation for pcl::RegionGrowingRGB<T> in C++\n\n\n\n"
},

{
    "location": "api/segmentation.html#PCLSegmentation.RegionGrowingRGBVal",
    "page": "Segmentation",
    "title": "PCLSegmentation.RegionGrowingRGBVal",
    "category": "Type",
    "text": "Value representation for pcl::RegionGrowingRGB<T> in C++\n\n\n\n"
},

{
    "location": "api/segmentation.html#PCLSegmentation.SACSegmentationPtr",
    "page": "Segmentation",
    "title": "PCLSegmentation.SACSegmentationPtr",
    "category": "Type",
    "text": "Pointer representation for pcl::SACSegmentation<T> in C++\n\n\n\n"
},

{
    "location": "api/segmentation.html#PCLSegmentation.SACSegmentationVal",
    "page": "Segmentation",
    "title": "PCLSegmentation.SACSegmentationVal",
    "category": "Type",
    "text": "Value representation for pcl::SACSegmentation<T> in C++\n\n\n\n"
},

{
    "location": "api/segmentation.html#Reference-1",
    "page": "Segmentation",
    "title": "Reference",
    "category": "section",
    "text": "Modules = [PCLSegmentation]\nOrder = [:constant, :function, :type, :macro]"
},

{
    "location": "api/surface.html#",
    "page": "Surface",
    "title": "Surface",
    "category": "page",
    "text": ""
},

{
    "location": "api/surface.html#PCLSurface.jl-1",
    "page": "Surface",
    "title": "PCLSurface.jl",
    "category": "section",
    "text": "PCLSurface"
},

{
    "location": "api/surface.html#Index-1",
    "page": "Surface",
    "title": "Index",
    "category": "section",
    "text": "Modules = [PCLSurface]\nOrder = [:constant, :function, :type, :macro]"
},

{
    "location": "api/surface.html#Reference-1",
    "page": "Surface",
    "title": "Reference",
    "category": "section",
    "text": "Modules = [PCLSurface]\nOrder = [:constant, :function, :type, :macro]"
},

{
    "location": "api/tracking.html#",
    "page": "Tracking",
    "title": "Tracking",
    "category": "page",
    "text": ""
},

{
    "location": "api/tracking.html#PCLTracking.jl-1",
    "page": "Tracking",
    "title": "PCLTracking.jl",
    "category": "section",
    "text": "PCLTracking"
},

{
    "location": "api/tracking.html#Index-1",
    "page": "Tracking",
    "title": "Index",
    "category": "section",
    "text": "Modules = [PCLTracking]\nOrder = [:constant, :function, :type, :macro]"
},

{
    "location": "api/tracking.html#PCLTracking.ApproxNearestPairPointCloudCoherence",
    "page": "Tracking",
    "title": "PCLTracking.ApproxNearestPairPointCloudCoherence",
    "category": "Constant",
    "text": "Pointer representation for pcl::tracking::ApproxNearestPairPointCloudCoherence<T> in C++\n\ntypealias of ApproxNearestPairPointCloudCoherencePtr\n\n\n\n"
},

{
    "location": "api/tracking.html#PCLTracking.DistanceCoherence",
    "page": "Tracking",
    "title": "PCLTracking.DistanceCoherence",
    "category": "Constant",
    "text": "Pointer representation for pcl::tracking::DistanceCoherence<T> in C++\n\ntypealias of DistanceCoherencePtr\n\n\n\n"
},

{
    "location": "api/tracking.html#PCLTracking.HSVColorCoherence",
    "page": "Tracking",
    "title": "PCLTracking.HSVColorCoherence",
    "category": "Constant",
    "text": "Pointer representation for pcl::tracking::HSVColorCoherence<T> in C++\n\ntypealias of HSVColorCoherencePtr\n\n\n\n"
},

{
    "location": "api/tracking.html#PCLTracking.KLDAdaptiveParticleFilterOMPTracker",
    "page": "Tracking",
    "title": "PCLTracking.KLDAdaptiveParticleFilterOMPTracker",
    "category": "Constant",
    "text": "Pointer representation for pcl::tracking::KLDAdaptiveParticleFilterOMPTracker<RT,PT> in C++\n\ntypealias of KLDAdaptiveParticleFilterOMPTrackerPtr\n\n\n\n"
},

{
    "location": "api/tracking.html#PCLTracking.KLDAdaptiveParticleFilterTracker",
    "page": "Tracking",
    "title": "PCLTracking.KLDAdaptiveParticleFilterTracker",
    "category": "Constant",
    "text": "Pointer representation for pcl::tracking::KLDAdaptiveParticleFilterTracker<RT,PT> in C++\n\ntypealias of KLDAdaptiveParticleFilterTrackerPtr\n\n\n\n"
},

{
    "location": "api/tracking.html#PCLTracking.NearestPairPointCloudCoherence",
    "page": "Tracking",
    "title": "PCLTracking.NearestPairPointCloudCoherence",
    "category": "Constant",
    "text": "Pointer representation for pcl::tracking::NearestPairPointCloudCoherence<T> in C++\n\ntypealias of NearestPairPointCloudCoherencePtr\n\n\n\n"
},

{
    "location": "api/tracking.html#PCLTracking.NormalCoherence",
    "page": "Tracking",
    "title": "PCLTracking.NormalCoherence",
    "category": "Constant",
    "text": "Pointer representation for pcl::tracking::NormalCoherence<T> in C++\n\ntypealias of NormalCoherencePtr\n\n\n\n"
},

{
    "location": "api/tracking.html#PCLTracking.ParticleXYR",
    "page": "Tracking",
    "title": "PCLTracking.ParticleXYR",
    "category": "Type",
    "text": "pcl::tracking::ParticleXYR\n\n\n\n"
},

{
    "location": "api/tracking.html#PCLTracking.ParticleXYRP",
    "page": "Tracking",
    "title": "PCLTracking.ParticleXYRP",
    "category": "Type",
    "text": "pcl::tracking::ParticleXYRP\n\n\n\n"
},

{
    "location": "api/tracking.html#PCLTracking.ParticleXYRPY",
    "page": "Tracking",
    "title": "PCLTracking.ParticleXYRPY",
    "category": "Type",
    "text": "pcl::tracking::ParticleXYRPY\n\n\n\n"
},

{
    "location": "api/tracking.html#PCLTracking.ParticleXYZR",
    "page": "Tracking",
    "title": "PCLTracking.ParticleXYZR",
    "category": "Type",
    "text": "pcl::tracking::ParticleXYZR\n\n\n\n"
},

{
    "location": "api/tracking.html#PCLTracking.ParticleXYZRPY",
    "page": "Tracking",
    "title": "PCLTracking.ParticleXYZRPY",
    "category": "Type",
    "text": "pcl::tracking::ParticleXYZRPY\n\n\n\n"
},

{
    "location": "api/tracking.html#PCLTracking.ApproxNearestPairPointCloudCoherencePtr",
    "page": "Tracking",
    "title": "PCLTracking.ApproxNearestPairPointCloudCoherencePtr",
    "category": "Type",
    "text": "Pointer representation for pcl::tracking::ApproxNearestPairPointCloudCoherence<T> in C++\n\n\n\n"
},

{
    "location": "api/tracking.html#PCLTracking.ApproxNearestPairPointCloudCoherenceVal",
    "page": "Tracking",
    "title": "PCLTracking.ApproxNearestPairPointCloudCoherenceVal",
    "category": "Type",
    "text": "Value representation for pcl::tracking::ApproxNearestPairPointCloudCoherence<T> in C++\n\n\n\n"
},

{
    "location": "api/tracking.html#PCLTracking.DistanceCoherencePtr",
    "page": "Tracking",
    "title": "PCLTracking.DistanceCoherencePtr",
    "category": "Type",
    "text": "Pointer representation for pcl::tracking::DistanceCoherence<T> in C++\n\n\n\n"
},

{
    "location": "api/tracking.html#PCLTracking.DistanceCoherenceVal",
    "page": "Tracking",
    "title": "PCLTracking.DistanceCoherenceVal",
    "category": "Type",
    "text": "Value representation for pcl::tracking::DistanceCoherence<T> in C++\n\n\n\n"
},

{
    "location": "api/tracking.html#PCLTracking.HSVColorCoherencePtr",
    "page": "Tracking",
    "title": "PCLTracking.HSVColorCoherencePtr",
    "category": "Type",
    "text": "Pointer representation for pcl::tracking::HSVColorCoherence<T> in C++\n\n\n\n"
},

{
    "location": "api/tracking.html#PCLTracking.HSVColorCoherenceVal",
    "page": "Tracking",
    "title": "PCLTracking.HSVColorCoherenceVal",
    "category": "Type",
    "text": "Value representation for pcl::tracking::HSVColorCoherence<T> in C++\n\n\n\n"
},

{
    "location": "api/tracking.html#PCLTracking.KLDAdaptiveParticleFilterOMPTrackerPtr",
    "page": "Tracking",
    "title": "PCLTracking.KLDAdaptiveParticleFilterOMPTrackerPtr",
    "category": "Type",
    "text": "Pointer representation for pcl::tracking::KLDAdaptiveParticleFilterOMPTracker<RT,PT> in C++\n\n\n\n"
},

{
    "location": "api/tracking.html#PCLTracking.KLDAdaptiveParticleFilterOMPTrackerVal",
    "page": "Tracking",
    "title": "PCLTracking.KLDAdaptiveParticleFilterOMPTrackerVal",
    "category": "Type",
    "text": "Value representation for pcl::tracking::KLDAdaptiveParticleFilterOMPTracker<RT,PT> in C++\n\n\n\n"
},

{
    "location": "api/tracking.html#PCLTracking.KLDAdaptiveParticleFilterTrackerPtr",
    "page": "Tracking",
    "title": "PCLTracking.KLDAdaptiveParticleFilterTrackerPtr",
    "category": "Type",
    "text": "Pointer representation for pcl::tracking::KLDAdaptiveParticleFilterTracker<RT,PT> in C++\n\n\n\n"
},

{
    "location": "api/tracking.html#PCLTracking.KLDAdaptiveParticleFilterTrackerVal",
    "page": "Tracking",
    "title": "PCLTracking.KLDAdaptiveParticleFilterTrackerVal",
    "category": "Type",
    "text": "Value representation for pcl::tracking::KLDAdaptiveParticleFilterTracker<RT,PT> in C++\n\n\n\n"
},

{
    "location": "api/tracking.html#PCLTracking.NearestPairPointCloudCoherencePtr",
    "page": "Tracking",
    "title": "PCLTracking.NearestPairPointCloudCoherencePtr",
    "category": "Type",
    "text": "Pointer representation for pcl::tracking::NearestPairPointCloudCoherence<T> in C++\n\n\n\n"
},

{
    "location": "api/tracking.html#PCLTracking.NearestPairPointCloudCoherenceVal",
    "page": "Tracking",
    "title": "PCLTracking.NearestPairPointCloudCoherenceVal",
    "category": "Type",
    "text": "Value representation for pcl::tracking::NearestPairPointCloudCoherence<T> in C++\n\n\n\n"
},

{
    "location": "api/tracking.html#PCLTracking.NormalCoherencePtr",
    "page": "Tracking",
    "title": "PCLTracking.NormalCoherencePtr",
    "category": "Type",
    "text": "Pointer representation for pcl::tracking::NormalCoherence<T> in C++\n\n\n\n"
},

{
    "location": "api/tracking.html#PCLTracking.NormalCoherenceVal",
    "page": "Tracking",
    "title": "PCLTracking.NormalCoherenceVal",
    "category": "Type",
    "text": "Value representation for pcl::tracking::NormalCoherence<T> in C++\n\n\n\n"
},

{
    "location": "api/tracking.html#Reference-1",
    "page": "Tracking",
    "title": "Reference",
    "category": "section",
    "text": "Modules = [PCLTracking]\nOrder = [:constant, :function, :type, :macro]"
},

{
    "location": "api/visualization.html#",
    "page": "Visualization",
    "title": "Visualization",
    "category": "page",
    "text": ""
},

{
    "location": "api/visualization.html#PCLVisualization.jl-1",
    "page": "Visualization",
    "title": "PCLVisualization.jl",
    "category": "section",
    "text": "PCLVisualization"
},

{
    "location": "api/visualization.html#Index-1",
    "page": "Visualization",
    "title": "Index",
    "category": "section",
    "text": "Modules = [PCLVisualization]\nOrder = [:constant, :function, :type, :macro]"
},

{
    "location": "api/visualization.html#PCLVisualization.PCL_INSIDE_FRUSTUM",
    "page": "Visualization",
    "title": "PCLVisualization.PCL_INSIDE_FRUSTUM",
    "category": "Constant",
    "text": "pcl::visualization::PCL_INSIDE_FRUSTUM\n\n\n\n"
},

{
    "location": "api/visualization.html#PCLVisualization.PCL_INTERSECT_FRUSTUM",
    "page": "Visualization",
    "title": "PCLVisualization.PCL_INTERSECT_FRUSTUM",
    "category": "Constant",
    "text": "pcl::visualization::PCL_INTERSECT_FRUSTUM\n\n\n\n"
},

{
    "location": "api/visualization.html#PCLVisualization.PCL_OUTSIDE_FRUSTUM",
    "page": "Visualization",
    "title": "PCLVisualization.PCL_OUTSIDE_FRUSTUM",
    "category": "Constant",
    "text": "pcl::visualization::PCL_OUTSIDE_FRUSTUM\n\n\n\n"
},

{
    "location": "api/visualization.html#PCLVisualization.PCL_VISUALIZER_COLOR",
    "page": "Visualization",
    "title": "PCLVisualization.PCL_VISUALIZER_COLOR",
    "category": "Constant",
    "text": "pcl::visualization::PCL_VISUALIZER_COLOR\n\n\n\n"
},

{
    "location": "api/visualization.html#PCLVisualization.PCL_VISUALIZER_FONT_SIZE",
    "page": "Visualization",
    "title": "PCLVisualization.PCL_VISUALIZER_FONT_SIZE",
    "category": "Constant",
    "text": "pcl::visualization::PCL_VISUALIZER_FONT_SIZE\n\n\n\n"
},

{
    "location": "api/visualization.html#PCLVisualization.PCL_VISUALIZER_IMMEDIATE_RENDERING",
    "page": "Visualization",
    "title": "PCLVisualization.PCL_VISUALIZER_IMMEDIATE_RENDERING",
    "category": "Constant",
    "text": "pcl::visualization::PCL_VISUALIZER_IMMEDIATE_RENDERING\n\n\n\n"
},

{
    "location": "api/visualization.html#PCLVisualization.PCL_VISUALIZER_LINE_WIDTH",
    "page": "Visualization",
    "title": "PCLVisualization.PCL_VISUALIZER_LINE_WIDTH",
    "category": "Constant",
    "text": "pcl::visualization::PCL_VISUALIZER_LINE_WIDTH\n\n\n\n"
},

{
    "location": "api/visualization.html#PCLVisualization.PCL_VISUALIZER_LUT",
    "page": "Visualization",
    "title": "PCLVisualization.PCL_VISUALIZER_LUT",
    "category": "Constant",
    "text": "pcl::visualization::PCL_VISUALIZER_LUT\n\n\n\n"
},

{
    "location": "api/visualization.html#PCLVisualization.PCL_VISUALIZER_LUT_GREY",
    "page": "Visualization",
    "title": "PCLVisualization.PCL_VISUALIZER_LUT_GREY",
    "category": "Constant",
    "text": "pcl::visualization::PCL_VISUALIZER_LUT_GREY\n\n\n\n"
},

{
    "location": "api/visualization.html#PCLVisualization.PCL_VISUALIZER_LUT_HSV",
    "page": "Visualization",
    "title": "PCLVisualization.PCL_VISUALIZER_LUT_HSV",
    "category": "Constant",
    "text": "pcl::visualization::PCL_VISUALIZER_LUT_HSV\n\n\n\n"
},

{
    "location": "api/visualization.html#PCLVisualization.PCL_VISUALIZER_LUT_HSV_INVERSE",
    "page": "Visualization",
    "title": "PCLVisualization.PCL_VISUALIZER_LUT_HSV_INVERSE",
    "category": "Constant",
    "text": "pcl::visualization::PCL_VISUALIZER_LUT_HSV_INVERSE\n\n\n\n"
},

{
    "location": "api/visualization.html#PCLVisualization.PCL_VISUALIZER_LUT_JET",
    "page": "Visualization",
    "title": "PCLVisualization.PCL_VISUALIZER_LUT_JET",
    "category": "Constant",
    "text": "pcl::visualization::PCL_VISUALIZER_LUT_JET\n\n\n\n"
},

{
    "location": "api/visualization.html#PCLVisualization.PCL_VISUALIZER_LUT_JET_INVERSE",
    "page": "Visualization",
    "title": "PCLVisualization.PCL_VISUALIZER_LUT_JET_INVERSE",
    "category": "Constant",
    "text": "pcl::visualization::PCL_VISUALIZER_LUT_JET_INVERSE\n\n\n\n"
},

{
    "location": "api/visualization.html#PCLVisualization.PCL_VISUALIZER_OPACITY",
    "page": "Visualization",
    "title": "PCLVisualization.PCL_VISUALIZER_OPACITY",
    "category": "Constant",
    "text": "pcl::visualization::PCL_VISUALIZER_OPACITY\n\n\n\n"
},

{
    "location": "api/visualization.html#PCLVisualization.PCL_VISUALIZER_POINT_SIZE",
    "page": "Visualization",
    "title": "PCLVisualization.PCL_VISUALIZER_POINT_SIZE",
    "category": "Constant",
    "text": "pcl::visualization::PCL_VISUALIZER_POINT_SIZE\n\n\n\n"
},

{
    "location": "api/visualization.html#PCLVisualization.PCL_VISUALIZER_REPRESENTATION",
    "page": "Visualization",
    "title": "PCLVisualization.PCL_VISUALIZER_REPRESENTATION",
    "category": "Constant",
    "text": "pcl::visualization::PCL_VISUALIZER_REPRESENTATION\n\n\n\n"
},

{
    "location": "api/visualization.html#PCLVisualization.PCL_VISUALIZER_REPRESENTATION_POINTS",
    "page": "Visualization",
    "title": "PCLVisualization.PCL_VISUALIZER_REPRESENTATION_POINTS",
    "category": "Constant",
    "text": "pcl::visualization::PCL_VISUALIZER_REPRESENTATION_POINTS\n\n\n\n"
},

{
    "location": "api/visualization.html#PCLVisualization.PCL_VISUALIZER_REPRESENTATION_SURFACE",
    "page": "Visualization",
    "title": "PCLVisualization.PCL_VISUALIZER_REPRESENTATION_SURFACE",
    "category": "Constant",
    "text": "pcl::visualization::PCL_VISUALIZER_REPRESENTATION_SURFACE\n\n\n\n"
},

{
    "location": "api/visualization.html#PCLVisualization.PCL_VISUALIZER_REPRESENTATION_WIREFRAME",
    "page": "Visualization",
    "title": "PCLVisualization.PCL_VISUALIZER_REPRESENTATION_WIREFRAME",
    "category": "Constant",
    "text": "pcl::visualization::PCL_VISUALIZER_REPRESENTATION_WIREFRAME\n\n\n\n"
},

{
    "location": "api/visualization.html#PCLVisualization.PCL_VISUALIZER_SHADING",
    "page": "Visualization",
    "title": "PCLVisualization.PCL_VISUALIZER_SHADING",
    "category": "Constant",
    "text": "pcl::visualization::PCL_VISUALIZER_SHADING\n\n\n\n"
},

{
    "location": "api/visualization.html#PCLVisualization.PCL_VISUALIZER_SHADING_FLAT",
    "page": "Visualization",
    "title": "PCLVisualization.PCL_VISUALIZER_SHADING_FLAT",
    "category": "Constant",
    "text": "pcl::visualization::PCL_VISUALIZER_SHADING_FLAT\n\n\n\n"
},

{
    "location": "api/visualization.html#PCLVisualization.PCL_VISUALIZER_SHADING_GOURAUD",
    "page": "Visualization",
    "title": "PCLVisualization.PCL_VISUALIZER_SHADING_GOURAUD",
    "category": "Constant",
    "text": "pcl::visualization::PCL_VISUALIZER_SHADING_GOURAUD\n\n\n\n"
},

{
    "location": "api/visualization.html#PCLVisualization.PCL_VISUALIZER_SHADING_PHONG",
    "page": "Visualization",
    "title": "PCLVisualization.PCL_VISUALIZER_SHADING_PHONG",
    "category": "Constant",
    "text": "pcl::visualization::PCL_VISUALIZER_SHADING_PHONG\n\n\n\n"
},

{
    "location": "api/visualization.html#PCLVisualization.PointCloudColorHandlerCustom",
    "page": "Visualization",
    "title": "PCLVisualization.PointCloudColorHandlerCustom",
    "category": "Constant",
    "text": "Pointer representation for pcl::visualization::PointCloudColorHandlerCustom<T> in C++\n\ntypealias of PointCloudColorHandlerCustomPtr\n\n\n\n"
},

{
    "location": "api/visualization.html#PCLVisualization.PointCloudColorHandlerRGBField",
    "page": "Visualization",
    "title": "PCLVisualization.PointCloudColorHandlerRGBField",
    "category": "Constant",
    "text": "Pointer representation for pcl::visualization::PointCloudColorHandlerRGBField<T> in C++\n\ntypealias of PointCloudColorHandlerRGBFieldPtr\n\n\n\n"
},

{
    "location": "api/visualization.html#PCLVisualization.PointCloudColorHandlerCustomPtr",
    "page": "Visualization",
    "title": "PCLVisualization.PointCloudColorHandlerCustomPtr",
    "category": "Type",
    "text": "Pointer representation for pcl::visualization::PointCloudColorHandlerCustom<T> in C++\n\n\n\n"
},

{
    "location": "api/visualization.html#PCLVisualization.PointCloudColorHandlerCustomVal",
    "page": "Visualization",
    "title": "PCLVisualization.PointCloudColorHandlerCustomVal",
    "category": "Type",
    "text": "Value representation for pcl::visualization::PointCloudColorHandlerCustom<T> in C++\n\n\n\n"
},

{
    "location": "api/visualization.html#PCLVisualization.PointCloudColorHandlerRGBFieldPtr",
    "page": "Visualization",
    "title": "PCLVisualization.PointCloudColorHandlerRGBFieldPtr",
    "category": "Type",
    "text": "Pointer representation for pcl::visualization::PointCloudColorHandlerRGBField<T> in C++\n\n\n\n"
},

{
    "location": "api/visualization.html#PCLVisualization.PointCloudColorHandlerRGBFieldVal",
    "page": "Visualization",
    "title": "PCLVisualization.PointCloudColorHandlerRGBFieldVal",
    "category": "Type",
    "text": "Value representation for pcl::visualization::PointCloudColorHandlerRGBField<T> in C++\n\n\n\n"
},

{
    "location": "api/visualization.html#Reference-1",
    "page": "Visualization",
    "title": "Reference",
    "category": "section",
    "text": "Modules = [PCLVisualization]\nOrder = [:constant, :function, :type, :macro]"
},

]}
